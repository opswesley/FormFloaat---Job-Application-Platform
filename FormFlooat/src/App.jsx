import Form from './components/Form';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Form />
    </ErrorBoundary>
  );
}

export default App;