import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function WalletField({ idx="", 
    coin, setCoin,
    description, setDescription,
    seed, setSeed
}) {
    return <Row className="mt-2">
        <Col sm={1}>
            <Form.Group>
                <Form.Label>#</Form.Label>
                <Form.Control value={idx} readOnly />
            </Form.Group>
        </Col>

        <Col sm={3}>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={description} autoFocus
                    placeholder="A Friendly name for your wallet"
                    onChange={ e => setDescription(e.target.value)} />
            </Form.Group>
        </Col>

        <Col sm={3}>
            <Form.Group>
                <Form.Label>Coin / Network</Form.Label>
                <Form.Control value={coin} placeholder="BTC | ADA | ETH | ETC"
                    onChange={ e => setCoin(e.target.value) } />
            </Form.Group>
        </Col>

        <Col sm={5}>
            <Form.Group>
                <Form.Label>Seed Phrase</Form.Label>
                <InputGroup>
                    <Form.Control value={seed}
                        onChange={ e => setSeed(e.target.value) } />
                    <Button variant="success" title="Add new Wallet" onClick={ () => {
                        // updateWallets();
                    }}>V </Button>
                </InputGroup>
            </Form.Group>
        </Col>
    </Row>
}