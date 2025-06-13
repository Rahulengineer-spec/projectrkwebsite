type WebSocketMessage = {
  type: string;
  payload: any;
};

type WebSocketCallback = (message: WebSocketMessage) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private callbacks: Map<string, Set<WebSocketCallback>> = new Map();
  private isConnecting = false;

  constructor(private url: string) {}

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          const callbacks = this.callbacks.get(message.type);
          if (callbacks) {
            callbacks.forEach((callback) => callback(message));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect();
      }, this.reconnectTimeout * this.reconnectAttempts);
    }
  }

  subscribe(type: string, callback: WebSocketCallback) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set());
    }
    this.callbacks.get(type)?.add(callback);

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
    }

    return () => {
      this.callbacks.get(type)?.delete(callback);
    };
  }

  send(message: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create a singleton instance
const wsService = new WebSocketService(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

export default wsService; 