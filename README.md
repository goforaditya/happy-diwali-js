# WhatsApp Diwali Image Generator (README WIP, PRs welcome)

This script uses the `whatsapp-web.js` library to send a Diwali greeting and a generated image to a list of favorite numbers.

## Installation

1. Clone this repository:
    ```
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```
    cd <project_directory>
    ```
3. Install the dependencies:
    ```
    npm install
    ```

## Configuration

# Uses whatsapp-js

Create a `.env` file in the root of your project and insert your key-value pairs in the following format of `NAME=VALUE`:

```env
FAVORITE_NUMBERS=number1,number2,number3
```

Replace `number1,number2,number3` with the actual phone numbers you want to send the message to, separated by commas. e.g. 919414194141

## Running the Script

To run the script, use the following command:

```bash
node index.js
```

When you run the script, it will generate a QR code in the terminal. Scan this QR code with your phone using WhatsApp.

The script will then send a Diwali greeting and a generated image to the favorite numbers specified in the `.env` file.

## Note

This script is for educational purposes only. Always ensure you have the consent of the recipient before sending automated messages.