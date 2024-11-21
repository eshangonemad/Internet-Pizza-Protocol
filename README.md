# Internet-Pizza-Protocol 🍕

A fun, interactive web application that lets users order virtual pizzas and receive them via email. Perfect for pizza lovers who are watching their calories!

## Features

- 🍕 Interactive pizza menu with real-time cart updates
- 💰 Dynamic pricing and quantity selection
- 📧 Email delivery of virtual pizzas
- 🖼️ High-quality pizza images included as email attachments
- 📱 Responsive design that works on all devices
- 🎨 Beautiful gradient-based UI with smooth animations

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with custom animations and gradients)
  - Vanilla JavaScript
  - Google Fonts (Google Sans, Righteous, Tilt Neon)

- **Backend:**
  - Node.js
  - Express.js
  - Nodemailer for email delivery

## Prerequisites

Before running this application, make sure you have:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- SMTP server credentials (uses Mailtrap by default)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/virtual-pizza-delivery.git
cd virtual-pizza-delivery
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your SMTP credentials:
```env
SMTP_PASSWORD=your_smtp_password
PORT=4000 # Optional, defaults to 4000
```

4. Make sure your pizza images are in the correct directory:
```
public/
  img/
    MargPizza.jpeg
    pepspiz.jpeg
    pasta.jpeg
    lavacake.jpeg
    prawn pizza.jpeg
    cheese.jpeg
    LogoTe.png
```

## Running the Application

1. Start the server:
```bash
node server.js
```

2. Open your browser and navigate to:
```
http://localhost:4000
```

## How It Works

1. **Menu Display:**
   - Pizza menu items are displayed in a responsive grid
   - Each item shows an image, name, and price
   - Users can adjust quantities using + and - buttons

2. **Cart System:**
   - Real-time cart updates
   - Dynamic total calculation
   - Clear visual feedback on item selection

3. **Order Processing:**
   - User enters their email address
   - System validates the order
   - Generates a beautiful HTML email
   - Attaches pizza images for offline viewing
   - Multiple quantities show multiple images

4. **Email Delivery:**
   - Confirmation email includes order summary
   - Shows all ordered items with quantities
   - Includes images of ordered pizzas
   - Attachments for offline viewing

## Project Structure

```
virtual-pizza-delivery/
├── public/
│   ├── img/
│   │   └── [pizza images]
│   └── index.html
├── server.js
├── package.json
├── .env
└── README.md
```

## Customization

### Adding New Pizza Types

1. Add the pizza image to `public/img/`
2. Update the `pizzaMenu` object in `server.js`:
```javascript
const pizzaMenu = {
  // ...
  7: {
    name: "New Pizza",
    price: 14.99,
    image: "public/img/new-pizza.jpeg"
  }
};
```
3. Add the corresponding HTML in `index.html`

### Modifying Email Template

The email template can be customized in the `generateOrderEmail` function in `server.js`. It uses HTML and inline CSS for maximum email client compatibility.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Pizza images are for demonstration purposes only
- Inspired by the love for virtual pizza 🍕
- Special thanks to all contributors and pizza lovers

## Support

For support, please create an issue in the repository or contact the maintainers.

---

Happy Virtual Pizza Eating! 🍕✨
