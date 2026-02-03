# マギカ-DB - Web API

![Project Screenshot](https://res.cloudinary.com/dsy30p7gf/image/upload/v1770126869/PUELLA-SCREENCAP_zixpfi.png)

A web application built with Express.js and MongoDB that manages data for magical girls, witches, and familiars inspired by the anime "Puella Magi Madoka Magica".

## Project Description

This project is a complete web application with REST API capabilities that allows you to create, read, update, and delete information about:

- **Magical Girls**: Main characters with their soul gem color, weapon, wish, and power level
- **Witches**: Enemies associated with magical girls, featuring barrier type and danger level
- **Familiars**: Minor creatures associated with witches

## Technologies Used

- **Backend**: Express.js 5.1.0
- **Database**: MongoDB + Mongoose 9.1.5
- **Template Engine**: Pug 3.0.3
- **Runtime**: Node.js

## Prerequisites

- Node.js installed
- MongoDB running
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd puella-magi-database
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the database**
   - Ensure MongoDB is running
   - Modify `db.js` if necessary with your connection string

4. **Start the server**
   ```bash
   npm start
   # Or directly with Node.js
   node index.js
   ```

   The server will be available at `http://localhost:8080`

## Project Structure

```
puella-magi-database/
├── index.js                          # Main server
├── db.js                            # MongoDB configuration
├── package.json                     # Project dependencies
├── models/
│   ├── MagicalGirl.js              # Magical girl schema
│   ├── Witch.js                    # Witch schema
│   └── Familiar.js                 # Familiar schema
├── views/
│   ├── layout.pug                  # Base template
│   ├── index.pug                   # Home page
│   ├── list.pug & listWitches.pug & listFamiliars.pug  # List views
│   ├── detail.pug & detailWitch.pug & detailFamiliar.pug  # Detail views
│   ├── edit.pug & editWitch.pug & editFamiliar.pug  # Edit forms
│   └── new.pug & newWitch.pug & newFamiliar.pug  # Creation forms
└── README.md                        # This file
```

## API Routes

### Magical Girls

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/magicalgirls` | Get all magical girls (JSON) |
| GET | `/magicalgirls/:id` | Get a magical girl by ID (JSON) |
| POST | `/magicalgirls` | Create a new magical girl (JSON) |
| PUT | `/magicalgirls/:id` | Update a magical girl (JSON) |
| DELETE | `/magicalgirls/:id` | Delete a magical girl (JSON) |

### Witches

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/witches` | Get all witches (JSON) |
| GET | `/witches/:id` | Get a witch by ID (JSON) |
| POST | `/witches` | Create a new witch (JSON) |
| PUT | `/witches/:id` | Update a witch (JSON) |
| DELETE | `/witches/:id` | Delete a witch (JSON) |

### Familiars

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/familiars` | Get all familiars (JSON) |
| GET | `/familiars/:id` | Get a familiar by ID (JSON) |
| POST | `/familiars` | Create a new familiar (JSON) |
| PUT | `/familiars/:id` | Update a familiar (JSON) |
| DELETE | `/familiars/:id` | Delete a familiar (JSON) |

## Web Interface Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/index` | Home page (alternative) |
| `/list` | List of magical girls |
| `/view/:id` | Magical girl detail page |
| `/new` | Create new magical girl form |
| `/edit/:id` | Edit magical girl form |
| `/process` | Process magical girl creation (POST) |
| `/process-witch` | Process witch creation (POST) |
| `/edit/:id` | Process magical girl edit (POST) |
| `/view/:id/delete` | Delete magical girl (POST) |
| `/list-witches` | List of witches |
| `/witch/:id` | Witch detail page |
| `/new-witch` | Create new witch form |
| `/edit-witch/:id` | Edit witch form |
| `/edit-witch/:id` | Process witch edit (POST) |
| `/witch/:id/delete` | Delete witch (POST) |
| `/list-familiars` | List of familiars |
| `/familiar/:id` | Familiar detail page |
| `/new-familiar` | Create new familiar form |
| `/edit-familiar/:id` | Edit familiar form |
| `/process-familiar` | Process familiar creation (POST) |
| `/edit-familiar/:id` | Process familiar edit (POST) |
| `/familiar/:id/delete` | Delete familiar (POST) |

## Data Models

### Magical Girl

- `name` (String, required): Name of the magical girl
- `soulGemColor` (String, required): Color of the soul gem
- `weapon` (String, required): Weapon type (Bow, Spear, Sword, Gun, Shield, Other)
- `wish` (String): The wish granted
- `isWitch` (Boolean): Whether transformed into a witch
- `powerLevel` (Number): Power level

### Witch

- `name` (String, required): Name of the witch
- `barrierType` (String): Type of barrier
- `dangerLevel` (Number): Danger level
- `defeated` (Boolean): Whether the witch has been defeated
- `magicalGirl` (Reference): Associated magical girl
- `firstAppearance` (Date): First appearance date
- `lastSeen` (Date): Last sighting date

### Familiar

- `name` (String, required): Name of the familiar
- `witch` (Reference, required): Associated witch
- `type` (String): Type of creature
- `strength` (Number): Strength level
- `isEvolved` (Boolean): Whether it has evolved

## Key Features

- Complete CRUD operations for all three entity types
- Data validation in models
- Relationships between entities (Witch -> MagicalGirl, Familiar -> Witch)
- Web interface with Pug templates
- REST API with JSON responses
- Error handling and validation
- Duplicate name prevention

## Author

Made with ♡ by SAMMYTSUKINO ~
