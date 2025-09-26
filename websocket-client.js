const { io } = require('socket.io-client');
const axios = require('axios');

// Configurações
const PRODUCTION_URL = 'http://3.145.34.134:8080';
const LOCAL_URL = 'http://localhost:3000';
const WS_URL = PRODUCTION_URL; // Mude para LOCAL_URL para testar localmente

class WebSocketNotificationClient {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.notificationsReceived = [];
    }

    log(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${message}`);
    }

    async connect() {
        this.log(`🔌 Conectando ao WebSocket: ${WS_URL}`);
        
        try {
            this.socket = io(WS_URL, {
                namespace: '/events',
                transports: ['websocket', 'polling']
            });

            this.socket.on('connect', () => {
                this.isConnected = true;
                this.log('✅ Conectado ao WebSocket com sucesso!');
                this.log(`Socket ID: ${this.socket.id}`);
            });

            this.socket.on('disconnect', () => {
                this.isConnected = false;
                this.log('❌ Desconectado do WebSocket');
            });

            this.socket.on('connect_error', (error) => {
                this.log(`❌ Erro de conexão: ${error.message}`);
                this.isConnected = false;
            });

            this.socket.on('newNotification', (notification) => {
                this.log('🔔 Nova notificação recebida via WebSocket!');
                this.log(`Dados: ${JSON.stringify(notification, null, 2)}`);
                this.notificationsReceived.push(notification);
            });

            this.socket.on('error', (error) => {
                this.log(`❌ Erro do WebSocket: ${error}`);
            });

            // Aguardar conexão
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout na conexão'));
                }, 10000);

                this.socket.on('connect', () => {
                    clearTimeout(timeout);
                    resolve();
                });

                this.socket.on('connect_error', (error) => {
                    clearTimeout(timeout);
                    reject(error);
                });
            });

        } catch (error) {
            this.log(`❌ Erro ao criar conexão: ${error.message}`);
            throw error;
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
            this.log('🔌 Desconectado manualmente');
        }
    }

    async createNotification(recipientId, content, category) {
        const notificationData = {
            recipientId,
            content,
            category
        };

        this.log(`📤 Enviando notificação para: ${WS_URL}/notifications`);
        this.log(`Dados: ${JSON.stringify(notificationData, null, 2)}`);

        try {
            const response = await axios.post(`${WS_URL}/notifications`, notificationData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            this.log('✅ Notificação criada com sucesso!');
            this.log(`Resposta: ${JSON.stringify(response.data, null, 2)}`);
            
            return response.data;
        } catch (error) {
            if (error.response) {
                this.log(`❌ Erro ao criar notificação: ${error.response.status} - ${error.response.data}`);
            } else {
                this.log(`❌ Erro na requisição: ${error.message}`);
            }
            throw error;
        }
    }

    getNotificationsReceived() {
        return this.notificationsReceived;
    }

    clearNotifications() {
        this.notificationsReceived = [];
    }
}

// Função principal de teste
async function testWebSocket() {
    const client = new WebSocketNotificationClient();
    
    try {
        // Conectar ao WebSocket
        await client.connect();
        
        // Aguardar um pouco para garantir que a conexão está estável
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Criar notificação de teste
        const testNotification = {
            recipientId: '8f6e5d4c-3b2a-1f0e-9d8c-7b6a5f4e3d2c',
            content: 'Você recebeu uma nova mensagem!',
            category: 'message'
        };
        
        client.log('🧪 Iniciando teste de notificação...');
        await client.createNotification(
            testNotification.recipientId,
            testNotification.content,
            testNotification.category
        );
        
        // Aguardar um pouco para receber a notificação via WebSocket
        client.log('⏳ Aguardando notificação via WebSocket...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Verificar se recebeu notificações
        const received = client.getNotificationsReceived();
        if (received.length > 0) {
            client.log(`✅ Teste bem-sucedido! Recebeu ${received.length} notificação(ões) via WebSocket`);
        } else {
            client.log('⚠️ Nenhuma notificação recebida via WebSocket');
        }
        
        // Desconectar
        client.disconnect();
        
    } catch (error) {
        client.log(`❌ Erro no teste: ${error.message}`);
        client.disconnect();
    }
}

// Executar teste se este arquivo for executado diretamente
if (require.main === module) {
    console.log('🚀 Iniciando teste do WebSocket...');
    testWebSocket();
}

module.exports = WebSocketNotificationClient;
