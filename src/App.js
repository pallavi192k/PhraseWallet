import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import TabCreate from './TabCreate';

function App() {
  return (
    <Container className='App'>
     <Card className="mt-5">
        <Card.Header className='header'>
          <Card.Title><h5><center>Create your Wallets Encrypted File</center></h5></Card.Title>
        </Card.Header>
        
        <Card.Body className='body'>
          <TabCreate />
        </Card.Body>

        <Card.Footer>
          <span className="footer">C Pallavi &copy; 2022</span>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default App;
