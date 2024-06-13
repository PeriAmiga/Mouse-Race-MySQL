import React, {useState, useEffect} from 'react';
import './BoardGame.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Collect, Avoid, Change } from './Classes';
import StopWatch from './StopWatch'
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
    getRandomNumber,
    getRandomPosition,
    moveCollectElements,
    moveAvoidElements,
    changeElementsDirection,
    changeElementsColor,
    formatTime,
    leaderBoardSlice,
    moveChangeElements
} from './Functions'
import LeaderBoard from "./LeaderBoard";
import axios from 'axios';


const amountOfCollect = getRandomNumber() ;
const amountOfAvoid = getRandomNumber();
const amountOfChange = getRandomNumber();

function BoardGame() {

    const [gameProgress, setGameProgress] = useState("playing");
    const [time, setTime] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [nickname, setNickname] = useState("");
    const [leaderBoard, setLeaderBoard] = useState([]);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(true);

    const [collectElements, setCollectElements] = useState([]);
    const [avoidElements, setAvoidElements] = useState([]);
    const [changeElements, setChangeElements] = useState([]);

    useEffect(() => {

        const generatedCollectElements = [];
        const generatedAvoidElements = [];
        const generatedChangeElements = [];

        // Generate Collect elements
        for (let i = 0; i < amountOfCollect; i++) {
            generatedCollectElements.push(new Collect());
        }

        // Generate Avoid elements
        for (let i = 0; i < amountOfAvoid; i++) {
            generatedAvoidElements.push(new Avoid());
        }

        // Generate Change elements
        for (let i = 0; i < amountOfChange; i++) {
            generatedChangeElements.push(new Change());
        }

        // Add random positions to elements
        const collectElementsWithPosition = generatedCollectElements.map((element) => ({
            ...element,
            position: getRandomPosition()
        }));

        const avoidElementsWithPosition = generatedAvoidElements.map((element) => ({
            ...element,
            position: getRandomPosition()
        }));

        const changeElementsWithPosition = generatedChangeElements.map((element) => ({
            ...element,
            position: getRandomPosition()
        }));

        setCollectElements(collectElementsWithPosition);
        setAvoidElements(avoidElementsWithPosition);
        setChangeElements(changeElementsWithPosition);
        setIsStarted(true);

        // Fetch leaderboard from API
        axios.get('http://localhost:5000/api/leaderboard')
            .then(response => {
                setLeaderBoard(response.data);
            })
            .catch(error => {
                console.error('Error fetching leaderboard:', error);
            });
    }, []);

    useEffect(() => {
        const collectInterval = setInterval(() => {
            setCollectElements((prevElements) => moveCollectElements(prevElements));
        }, 500);

        const avoidInterval = setInterval(() => {
            setAvoidElements((prevElements) => moveAvoidElements(prevElements));
        }, 500);

        const changeInterval = setInterval(() => {
            setChangeElements((prevElements) => moveChangeElements(prevElements));
        }, 500);

        const collectDirectionInterval = setInterval(() => {
            setCollectElements((prevElements) => changeElementsDirection(prevElements));
        }, 2000);

        const avoidDirectionInterval = setInterval(() => {
            setAvoidElements((prevElements) => changeElementsDirection(prevElements));
        }, 3000);

        const changeColorInterval = setInterval(() => {
            setChangeElements((prevElements) => changeElementsColor(prevElements));
        }, 2000);

        // Cleanup function to clear intervals on unmount
        return () => {
            clearInterval(collectInterval);
            clearInterval(avoidInterval);
            clearInterval(changeInterval);
            clearInterval(collectDirectionInterval);
            clearInterval(avoidDirectionInterval);
            clearInterval(changeColorInterval);
        };
    }, []);

    useEffect(() => {
        if (isStarted)
        {
            if (collectElements.length === 0 && changeElements.length === 0 && gameProgress !== 'leaderBoard')
            {
                setGameProgress('win');
                setIsRunning(false);
            }
        }
    }, [collectElements, changeElements, gameProgress, isStarted]);

    // Handle collect element click to remove it from the board
    function handleRemoveCollectElement(index) {
        setCollectElements(prevElements => prevElements.filter((_, i) => i !== index));
    }

    // Handle avoid element click
    function handleClickAvoidElement(index) {
        setGameProgress('loss');
        setIsRunning(false);
    }

    // Handle collect element click to remove it from the board
    function handleClickChangeElement(index, color) {
        if (color === "green") {
            setChangeElements(prevElements => prevElements.filter((_, i) => i !== index));
        }
        else
        {
            setGameProgress('loss');
            setIsRunning(false);
        }
    }

    // Function to reload the page
    function handleReload() {
        window.location.reload();
    }

    // Update nickname as the user types
    function handleNicknameChange(event) {
        setNickname(event.target.value);
    }

    // Save the score of the player and send it to the database
    function handleSubmit() {
        if (nickname === "")
        {
            alert('Please enter a valid nickname');
            return;
        }
        axios.post('http://localhost:5000/api/leaderboard', {
            nickname: nickname,
            time: formatTime(time)
        })
            .then(response => {
                alert('Nickname and Time saved to the leaderboard!');
                setGameProgress('leaderBoard');
                // Fetch updated leaderboard after submission
                axios.get('http://localhost:5000/api/leaderboard')
                    .then(response => {
                        setLeaderBoard(leaderBoardSlice(response.data));
                    })
                    .catch(error => {
                        console.error('Error fetching leaderboard:', error);
                    });
            })
            .catch(error => {
                console.error('Error submitting to leaderboard:', error);
            });
    }

    return (
        gameProgress === "playing" ? (
            <div className="boardGame">
                <Container className="stopWatch">
                    <StopWatch time={time} setTime={setTime} isRunning={isRunning} />
                </Container>
                <Container className="board">
                    {collectElements.map((element, index) => (
                        <LuRectangleHorizontal
                            key={index}
                            className={`element ${element.type.toLowerCase()}`}
                            onClick={() => handleRemoveCollectElement(index)}
                            style={{
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                color: element.color,
                                position: 'absolute',
                                top: element.position.top,
                                left: element.position.left,
                                cursor: "pointer"
                            }}>
                        </LuRectangleHorizontal>
                    ))}

                    {avoidElements.map((element, index) => (
                        <FaRegCircle
                            key={index}
                            className={`element ${element.type.toLowerCase()}`}
                            onClick={() => handleClickAvoidElement(index)}
                            style={{
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                color: element.color,
                                position: 'absolute',
                                top: element.position.top,
                                left: element.position.left,
                                cursor: "pointer"
                            }}>
                        </FaRegCircle>
                    ))}

                    {changeElements.map((element, index) => (
                        <FaRegSquare
                            key={index}
                            className={`element ${element.type.toLowerCase()}`}
                            onClick={() => handleClickChangeElement(index, element.color)}
                            style={{
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                color: element.color,
                                position: 'absolute',
                                top: element.position.top,
                                left: element.position.left,
                                cursor: "pointer"
                            }}>
                        </FaRegSquare>
                    ))}
                </Container>
            </div>
        ) : (
            gameProgress === "loss" ? (
                <div className="loss">
                    <div className="lossMessage">Oh, You lost the game. Try again!</div>
                    <Button className="tryAgainButton" variant="primary" onClick={handleReload}>
                        Try Again
                    </Button>
                </div>

            ) : (
                gameProgress === "win" ? (
                    <div className="win">
                        <div className="winMessage">Yeay, You won the game in {formatTime(time)}. Enter your nickname to join the leaderboard!</div>
                        <InputGroup className="nicknameInput" size="lg">
                            <InputGroup.Text id="nickname">Nickname</InputGroup.Text>
                            <Form.Control
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                value={nickname}
                                onChange={handleNicknameChange}
                            />
                        </InputGroup>
                        <Button className="sendButton" variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                ) : (
                    gameProgress === "leaderBoard" ? (
                        <div className="leaderBoard">
                            <LeaderBoard leaderBoard={leaderBoard}/>
                        </div>
                    ) : null
                )
            )
        )
    );
}

export default BoardGame;