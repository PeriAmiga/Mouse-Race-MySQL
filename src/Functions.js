// Utility function to get a random size
export function getRandomSize()
{
    return Math.floor(Math.random() * 30) + 10; // Random size between 10 and 40
}

// Function to get random number of elements
export function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Random number between 1 and 10
}

// Function to generate random position within the board's bounds
export function getRandomPosition()
{
    // Calculate the number of rows and columns in the grid (e.g., 4x4)
    const rows = 20; // Adjust as needed
    const cols = 20; // Adjust as needed

    // Calculate the width and height of each grid cell
    const cellWidth = 100 / cols; // Width of each cell as a percentage
    const cellHeight = 100 / rows; // Height of each cell as a percentage

    // Calculate a random row and column index within the grid
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    // Calculate the top and left positions based on the row and column indices
    const top = `${randomRow * cellHeight}%`;
    const left = `${randomCol * cellWidth}%`;

    // Return the random position
    return { top, left };
}

// Change the position of collect elements
export function moveCollectElements (elements)
{
    return elements.map((element) => {
        const newPosition = { ...element.position };
        if (element.direction === 1) {
            newPosition.top = `${parseFloat(newPosition.top) - 2}%`;
        } else {
            newPosition.top = `${parseFloat(newPosition.top) + 2}%`;
        }
        return { ...element, position: newPosition };
    });
}

// Change the position of avoid elements
export function  moveAvoidElements (elements)
{
    return elements.map((element) => {
        const newPosition = { ...element.position };
        if (element.direction === 1) {
            newPosition.left = `${parseFloat(newPosition.left) + 2}%`;
        } else {
            newPosition.left = `${parseFloat(newPosition.left) - 2}%`;
        }
        return { ...element, position: newPosition };
    });
}

// Change the position of change elements
export function moveChangeElements(elements) {
    return elements.map((element) => {
        const newPosition = { ...element.position };
        let newDirection = { ...element.direction };
        // Determine the direction and update position accordingly
        if (element.direction === 1) {
            // Move right
            newPosition.left = `${parseFloat(newPosition.left) + 2}%`;
            newDirection = 2;
        }
        else if (element.direction === -1) {
            // Move left
            newPosition.left = `${parseFloat(newPosition.left) - 2}%`;
            newDirection = -2;
        }
        else if (element.direction === 2) {
            // Move down
            newPosition.top = `${parseFloat(newPosition.top) + 5}%`;
            newDirection = -1;
        }
        else if (element.direction === -2) {
            // Move up
            newPosition.top = `${parseFloat(newPosition.top) - 5}%`;
            newDirection = 1;
        }
        return { ...element, position: newPosition, direction: newDirection };
    });
}

// Change the direction of elements
export function changeElementsDirection (elements)
{
    return elements.map((element) => {
        const newDirection = -element.direction;
        return { ...element, direction: newDirection };
    });
}

// Change the color of elements
export function changeElementsColor (elements)
{
    return elements.map((element) => {
        const newColor = element.color === 'red' ? 'green' : 'red';
        return { ...element, color: newColor };
    });
}

// Format the time into minutes:seconds:milliseconds
export function formatTime (time)
{
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};

// Format the time into number of milliseconds
export function parseTime(formattedTime) {
    // Split the formatted time string into its components
    const [minutes, seconds, milliseconds] = formattedTime.split(':').map(Number);

    // Calculate the total time in milliseconds
    const totalTime = (minutes * 60 * 100) + (seconds * 100) + milliseconds;

    return totalTime;
}

export function leaderBoardSlice(leaderBoard)
{
    // Convert time strings to numbers
    leaderBoard.forEach(player => {
        player.time = parseTime(player.time);
    });
    // Sort the players by time (ascending order)
    leaderBoard.sort((a, b) => a.time - b.time);
    // Convert time numbers to strings
    leaderBoard.forEach(player => {
        player.time = formatTime(player.time);
    });
    // Keep only the top 3 players
    if (leaderBoard.length > 3) {
        leaderBoard = leaderBoard.slice(0, 3);
    }
    return leaderBoard;
}