// ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
