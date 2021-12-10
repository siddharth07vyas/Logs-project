import logo from './logo.svg';
import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import LogsComponent from './components/logs.component';
function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              
            React 
            </Navbar.Brand>
          </Container>
        </Navbar>

        <LogsComponent />
    </div>
  );
}

export default App;
