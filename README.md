# ApiEquipeProjets

This project is a Laravel-based API for managing projects and team members. The API provides endpoints for creating, reading, updating, and deleting projects and team members.

## Features

-   Swagger documentation for API endpoints
-   CRUD operations for projects and team members
-   Authentication and authorization

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ApiEquipeProjets.git
```

2. Navigate to the project directory:

```bash
cd ApiEquipeProjets
```

3. Install dependencies:

```bash
composer install
```

4. Copy the `.env.example` file to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

5. Generate an application key:

```bash
php artisan key:generate
```

6. Run the database migrations:

```bash
php artisan migrate
```

## Usage

1. Start the development server:

```bash
php artisan serve
```

2. Access the Swagger documentation at:

```
http://localhost:8000/api/documentation
```

## Screenshots

### Swagger Documentation Start URL

![Swagger Documentation Start URL](https://github.com/yourusername/ApiEquipeProjets/blob/main/screenshots/first.png)

### List of Projects and Team Members Actions

![List of Projects and Team Members Actions](https://github.com/yourusername/ApiEquipeProjets/blob/main/screenshots/second.png)

### Try Out Get in Team Members

![Try Out Get in Team Members](https://github.com/yourusername/ApiEquipeProjets/blob/main/screenshots/third.png)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
