const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.json());

const pizzaMenu = {
  1: {
    name: "Margherita",
    price: 9.99,
    image: "/img/MargPizza.jpeg"
  },
  2: {
    name: "Pepperoni",
    price: 11.99,
    image: "/img/pepspiz.jpeg"
  },
  3: {
    name: "Pasta",
    price: 12.99,
    image: "/img/pasta.jpeg"
  },
  4: {
    name: "Lava Cake",
    price: 9.99,
    image: "/img/lavacake.jpeg"
  },
  5: {
    name: "Prawn Pizza",
    price: 10.99,
    image: "/img/prawn pizza.jpeg"
  },
  6: {
    name: "Cheese Pizza",
    price: 19.99,
    image: "/img/cheese.jpeg"
  }
};

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.MAILTRAP_PASSWORD
  }
});

function validateOrder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  return items.every(item => {
    return (
      item.pizzaId && 
      pizzaMenu[item.pizzaId] && 
      item.quantity && 
      Number.isInteger(item.quantity) && 
      item.quantity > 0
    );
  });
}

async function generateOrderEmail(items) {
  const orderTotal = items.reduce((total, item) => {
    return total + (pizzaMenu[item.pizzaId].price * item.quantity);
  }, 0);

  const itemsHtml = items.map(item => {
    const pizza = pizzaMenu[item.pizzaId];
    const itemTotal = pizza.price * item.quantity;
    
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${pizza.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">∰${pizza.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">∰${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; color: #333;">🍕 Your Virtual Pizza Order</h1>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #eee;">
              <th style="padding: 10px; text-align: left;">Pizza</th>
              <th style="padding: 10px; text-align: left;">Quantity</th>
              <th style="padding: 10px; text-align: left;">Price</th>
              <th style="padding: 10px; text-align: left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Order Total:</td>
              <td style="padding: 10px; font-weight: bold;">∰${orderTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style="text-align: center; color: #666;">
        Enjoy your virtual pizzas! They're calorie-free! 🎉
      </p>
      
      <p style="text-align: center; color: #999; font-size: 12px;">
        This is a virtual delivery service. No real pizzas were harmed in the making of this email.
      </p>
    </div>
  `;
}
const handler = app.use((req, res) => {
  if (req.method === 'POST' && req.url === '/api/order') {
    const { email, items } = req.body;

    if (!email || !items) {
      return res.status(400).json({ 
        message: "Missing required information" 
      });
    }

    if (!validateOrder(items)) {
      return res.status(400).json({ 
        message: "Invalid order items" 
      });
    }

    generateOrderEmail(items)
      .then(htmlContent => {
        return transport.sendMail({
          from: '"Virtual Pizza 🍕" <pizza@pizzaprotocol.xyz>',
          to: email,
          subject: "Your Virtual Pizza Order Has Arrived! 🍕",
          html: htmlContent
        });
      })
      .then(() => {
        res.json({ 
          message: "Virtual pizzas sent! Check your email 📧" 
        });
      })
      .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).json({ 
          message: "Error delivering your virtual pizzas" 
        });
      });
  } 
  else if (req.method === 'GET' && req.url === '/api/menu') {
    res.json(pizzaMenu);
  }
  else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = handler;