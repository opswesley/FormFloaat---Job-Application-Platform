import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-800 rounded-lg max-w-3xl mx-auto my-8">
          <h2 className="text-xl font-bold mb-2">Algo deu errado!</h2>
          <p>Por favor, recarregue a página ou limpe os dados salvos no LocalStorage.</p>
          <button
            onClick={() => {
              localStorage.removeItem('jobApplications');
              window.location.reload();
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Limpar Dados e Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;