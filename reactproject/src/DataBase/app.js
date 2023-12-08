const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const app = express()
const port = 3001

const cors = require('cors')
app.use(cors())

// Создаем и подключаем базу данных SQLite
const db = new sqlite3.Database('./CarsBD.db')

// Создаем таблицу, если ее нет
db.serialize(() => {
	db.run(
		'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, img TEXT);\n CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, userLogin TEXT, userPWD TEXT, userName TEXT, userLastName TEXT)'
	)
})

// Разрешаем использовать JSON в запросах
app.use(express.json())

// Получаем все элементы
app.get('/api/Getitems', (req, res) => {
	const query = req.query.query
	//	console.log(req.query.query)
	db.all('SELECT * FROM items ' + query, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json(rows)
	})
})

app.get('/api/Countitems', (req, res) => {
	db.get('SELECT COUNT(*) as count FROM items', (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json(row.count)
	})
})

app.get('/api/Getitem', (req, res) => {
	const id = req.query.id
	db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}
		res.json(row)
	})
})

app.delete('/api/DeleteItem', (req, res) => {
	const id = req.query.id
	db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
			return
		}

		res.json({ message: 'Item deleted successfully', changes: this.changes })
	})
})

// Создаем новый элемент
app.post('/api/Additem', (req, res) => {
	const { name } = req.body
	if (!name) {
		res.status(400).json({ error: 'Name is required' })
		return
	}
	const { price, img } = req.body

	db.run(
		'INSERT INTO items (name, price, img) VALUES (?, ?, ?)',
		[name, price, img],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
				return
			}
			res.json({ id: this.lastID, name: name })
		}
	)
})

app.post('/login', async (req, res) => {
	const { login, pwd } = req.body
	db.get('SELECT userId, userPWD FROM users WHERE userLogin = ?', [login], async (err, row) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ error: 'Internal server error' })
		}

		if (!row) {
			// Пользователь с таким login не найден
			return res.status(401).json({ error: 'Invalid login or password' })
		}

		const hashedPassword = row.userPWD

		// Сравниваем введенный пароль с хешированным паролем из базы данных
		const passwordMatch = await bcrypt.compare(pwd, hashedPassword)
		if (passwordMatch) {
			// Пароли совпадают, вы можете создать и отправить токен
			const token = jwt.sign({ userId: row.userId }, '1234', { expiresIn: '10h' })
			res.json({ token })
		} else {
			// Пароли не совпадают
			res.status(401).json({ error: 'Invalid login or password' })
		}
	})
})

app.post('/registration', async (req, res) => {
	const { name, lname, login, pwd } = req.body.userData

	const hashedPassword = await bcrypt.hash(pwd, 10)
	// Проверка, что пользователь с таким login не существует
	db.get('SELECT userId FROM users WHERE userLogin = ?', [login], (err, row) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ error: 'Internal server error' })
		}

		if (row) {
			// Пользователь с таким login уже существует
			return res.status(400).json({ error: 'User with this login already exists' })
		}
		// Добавление нового пользователя
		db.run(
			'INSERT INTO users (userName, userLastName, userLogin, userPWD) VALUES (?, ?, ?, ?)',
			[name, lname, login, hashedPassword],
			err => {
				if (err) {
					console.error(err)
					return res.status(500).json({ error: 'Internal server error' })
				}

				// Возвращаем успешный ответ
				res.json({ success: true })
			}
		)
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://158.160.133.46:${port}`)
})
