import React, {useState} from 'react';
import './Game.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import BoardGame from "./BoardGame";


function Game() {

    // Instructions Card
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Start Game
    const [isStart, setStart] = useState(false);
    function handleStart() {
        setStart(true);
    }


    return (
        <>
            {!isStart ? (
                <div className="gameLobby">
                    <Button className="startButton" variant="primary" size="lg" onClick={handleStart}>Start</Button>
                    <br/>
                    <Button className="instructionsButton" variant="secondary" size="lg" onClick={handleShow}>Instructions</Button>
                    {show && <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mouse Race Game - Instructions</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Welcome to the Mouse Race game! Here are the instructions:
                            <ul>
                                <li>Click 'Start' in the center of the screen to begin the game.</li>
                                <li>Elements will appear randomly on the screen.</li>
                                <li>Click on the Collect elements (green) to collect them.</li>
                                <li>Avoid clicking on the Avoid elements (red) to prevent losing.</li>
                                <li>The Change elements (square) alternate their behavior between Collect and Avoid.</li>
                                <li>Make all the Collect and Change elements disappear to win the game.</li>
                                <li>Submit your time to the global leaderboard after finishing the game.</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </div>) : (
                <div className="gameBoard">
                    <BoardGame/>
                </div>)}
            </>
    );
}

export default Game;