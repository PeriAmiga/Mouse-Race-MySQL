import React from 'react';
import './LeaderBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';


function LeaderBoard({leaderBoard}) {

    // Handle close leaderboard
    function handleClose() {
        window.location.reload();
    }

    return (
            <div className="leaderBoard">
                <Container className="leaderBoardContainer">
                    <h2 className="h2">The Top 3 Scores</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>NickName</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderBoard.map((player, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{player.nickname}</td>
                                <td>{player.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Button className="closeButton" variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Container>
            </div>
    );
}

export default LeaderBoard;