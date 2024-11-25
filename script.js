const checkOutLine = [
    [], // Line 1
    [], // Line 2
    [], // Line 3
    [], // Line 4
    []  // Line 5
];

const customers = [
    "Max", "James", "Alice", "Sophia", "Liam", "Emma", "Noah", "Olivia",
    "Ethan", "Isabella", "Lucas", "Mia", "Mason", "Charlotte", "Logan",
    "Amelia", "Elijah", "Harper", "Jacob", "Evelyn", "Michael", "Avery",
    "Benjamin", "Scarlett", "Alexander", "Abigail", "Henry", "Emily",
    "William", "Ella", "Daniel", "Luna", "Matthew", "Chloe", "Aiden",
    "Layla", "Samuel", "Sofia", "Owen", "Lily", "Sebastian", "Aria",
    "Gabriel", "Ellie", "Carter", "Hannah", "Jack", "Grace", "Leo"
];

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Function to generate a random customer and their item
function generateRandomCustomer() {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const item = items[Math.floor(Math.random() * items.length)];
    return { customer, items: item };
}

// Add a customer to the checkout lines
function createTask() {
    const userName = document.getElementById('item').value.trim();
    const itemNumber = document.getElementById('name').value.trim();

    // Validate inputs and ensure no more than 15 items
    if (userName !== '' && itemNumber !== '' && itemNumber <= 15) {
        const task = { customer: userName, items: parseInt(itemNumber) };
        console.log(task);
        // Find the line with the fewest customers
        const shortestLine = checkOutLine.reduce(
            (minLine, currentLine) =>
                currentLine.length < minLine.length ? currentLine : minLine,
            checkOutLine[0]
        );

        // Add the new task to the shortest line
        shortestLine.push(task);

        // Re-render the lines
        rendering();
    } else {
        alert("Please ensure the number of items is between 1 and 15.");
    }

    // Clear input fields after submission
    document.getElementById('item').value = '';
    document.getElementById('name').value = '';
}

// Rendering the lines with customers
function rendering() {
    checkOutLine.forEach((line, index) => {
        // Clear the previous content of the line
        const lineList = document.getElementById(`taskList${index + 1}`);
        lineList.innerHTML = `<h3>Checkout Line ${index + 1}</h3>`;

        // If the line is not empty, display the customers and their items
        if (line.length > 0) {
            line.forEach(task => {
                lineList.innerHTML += `<p><strong>(Customer Name:</strong> ${task.customer},---<strong> Number of Items:</strong> ${task.items})</p>`;
                console.log("task");
            });
        } else {
            lineList.innerHTML += `<p>No customers in this line yet.</p>`;
        }
    });
}

// Function to generate random customers and items for the lines
function randomizeCheckoutLines() {
    // For each line, generate random customers, ensuring no line exceeds 5 customers
    checkOutLine.forEach(line => {
        // If the line has fewer than 5 customers, add random ones
        if (line.length < 5) {
            const numCustomersToAdd = Math.floor(Math.random() * (5 - line.length)) + 1; // Random number to add, ensuring no more than 5 customers per line
            for (let i = 0; i < numCustomersToAdd; i++) {
                line.push(generateRandomCustomer()); // Add random customer to the line
            }
        }else if (line.length <= 5) {
            const targetCustomers = Math.floor(Math.random() * 4) + 1; // Random target between 1 and 4
            const numCustomersToRemove = line.length - targetCustomers; // Calculate how many to remove
            for (let i = 0; i < numCustomersToRemove; i++) {
                line.pop(); // Remove one customer at a time
            }
        }
        
    });

    // Re-render the lines
    rendering();
}

// Call this function to randomize and render the checkout lines initially
randomizeCheckoutLines();

// Function to update the checkout lines every 2 seconds using setInterval
function startPeriodicRendering() {
    setInterval(() => {
        // Randomly add new customers to lines periodically (every 2 seconds)
        randomizeCheckoutLines();
        // Re-render the lines
        rendering();
    }, 3000); // Update every 2 seconds
}

// Start periodic updates
startPeriodicRendering();


