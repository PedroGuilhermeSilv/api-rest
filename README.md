## O que é uma api REST


## Modelo de maturidade de Richardson
Para considerar uma API Rest ele deve atingir os seguintes niveis.

![image](./imgs/overview.png)

- `Level 0`: Uso apenas do http e json.
- `Level 1`: Uso dos recursos e padronização como de rotas `/products`
- `Level 2`: Integração das prodonização com os verbos http. Queremos alterar a ação que iremos fazer em um recurso através do verbo.
- `Level 3`: As respostas das nossas APIs precisam melhorar a sua navegação.

### Os **princípios do RESTful** são baseados na arquitetura REST (Representational State Transfer) definida por Roy Fielding. Eles fornecem diretrizes para criar sistemas escaláveis, simples e eficientes. Abaixo estão os principais princípios:

---

### **1. Arquitetura Cliente-Servidor**
- **Separação de responsabilidades**: O cliente (frontend) e o servidor (backend) são sistemas independentes.
  - O cliente cuida da interface do usuário e solicita dados.
  - O servidor processa as solicitações e retorna os dados ou resultados.
- **Benefício**: Permite maior escalabilidade e independência no desenvolvimento de cada parte.

---

### **2. Stateless (Sem Estado)**
- **Definição**: Cada requisição do cliente deve conter toda informação necessária para ser processada.
  - O servidor não mantém informação sobre sessões entre requisições
  - Cada requisição é independente e completa

#### Características:
- Nenhum estado do cliente é armazenado no servidor
- Cada requisição deve ter todo contexto necessário
- Tokens de autenticação devem ser enviados em cada requisição
- Melhora a confiabilidade e escalabilidade

### Exemplo de API Stateful vs Stateless

#### API Stateful (Não Recomendado em REST):
```javascript
// Servidor mantém estado da sessão
let sessions = {};

app.post('/login', (req, res) => {
    const { username } = req.body;
    // Cria sessão e armazena no servidor
    sessions[sessionId] = { username, lastAccess: new Date() };
    res.cookie('sessionId', sessionId);
});

app.get('/user-data', (req, res) => {
    const sessionId = req.cookies.sessionId;
    // Depende do estado armazenado
    const userData = sessions[sessionId];
    res.json(userData);
});
```

#### API Stateless (Recomendado em REST):
```javascript
app.post('/login', (req, res) => {
    const { username } = req.body;
    // Gera token com informações necessárias
    const token = jwt.sign({ username }, 'secret-key');
    res.json({ token });
});

app.get('/user-data', (req, res) => {
    // Cada requisição contém todas as informações necessárias
    const token = req.headers.authorization;
    const userData = jwt.verify(token, 'secret-key');
    res.json(userData);
});
```

#### Por que Stateless é melhor?
- Servidor não precisa manter estado
- Escalabilidade horizontal simplificada
- Qualquer servidor pode processar qualquer requisição
- Maior confiabilidade


---

### **3. Cacheabilidade**
- **Definição**: As respostas do servidor devem indicar se podem ou não ser armazenadas em cache pelo cliente ou intermediários.
  - Usando cabeçalhos HTTP como `Cache-Control`, `ETag`, etc.
- **Benefício**: Reduz a carga no servidor e melhora a performance para o cliente.

---

### **4. Interface Uniforme**
Esse é um dos princípios mais importantes do REST e tem quatro restrições principais:
1. **Identificação de Recursos**: Cada recurso deve ser identificável por um URI único.
   - Exemplo: `/produtos/123`.
2. **Manipulação de Recursos por Representações**: O cliente interage com recursos por meio de representações (geralmente JSON ou XML).
   - Exemplo: O servidor retorna os dados do recurso no formato JSON.
3. **Mensagens Autodescritivas**: Cada mensagem deve conter informações completas sobre como processá-la.
   - Exemplo: Cabeçalhos HTTP indicam tipo de conteúdo (`Content-Type: application/json`).
4. **Hypermedia as the Engine of Application State (HATEOAS)**: As respostas devem conter links para outras ações possíveis.
   - Exemplo: Uma resposta `GET /usuarios/1` pode incluir:
     ```json
     {
       "id": 1,
       "nome": "João",
       "links": {
         "atualizar": "/usuarios/1",
         "deletar": "/usuarios/1"
       }
     }
     ```

---

### **5. Sistema em Camadas**
- **Definição**: A arquitetura deve ser organizada em camadas, onde cada uma tem responsabilidades específicas (servidores, proxies, balanceadores de carga, etc.).
- **Benefício**: Aumenta a modularidade e a segurança do sistema.

---

### **6. Código sob Demanda (Opcional)**
- **Definição**: O servidor pode fornecer ao cliente código executável sob demanda (como scripts JavaScript).
- **Benefício**: Permite funcionalidades dinâmicas no cliente, mas é opcional e raramente usado em APIs RESTful.

---


## Lista de verbos
| **Verbo**   | **Objetivo**                        | **Idempotente** | **Safe** |
|-------------|-------------------------------------|----------------|---------|
| `GET`       | Recuperar recursos                  | Sim            | Sim     |
| `POST`      | Criar um recurso                    | Não            | Não     |
| `PUT`       | Substituir recurso completamente    | Sim            | Não     |
| `PATCH`     | Atualizar parcialmente um recurso   | Sim            | Não     |
| `DELETE`    | Remover um recurso                  | Sim            | Não     |
| `HEAD`      | Obter cabeçalhos                    | Sim            | Sim     |
| `OPTIONS`   | Verificar métodos permitidos        | Sim            | Sim     |
| `TRACE`     | Depurar requisição                  | Sim            | Não     |
| `CONNECT`   | Estabelecer túnel                   | Não            | Não     |



## Listagem dos status http
https://www.httpstatus.com.br/ 


## Content-Type
O Content-Type é um cabeçalho HTTP que:
- Define o tipo de mídia do recurso enviado na requisição/resposta
- Indica ao cliente como interpretar o corpo da mensagem
- Também conhecido como tipo MIME (Multipurpose Internet Mail Extensions)

### Tipos Comuns:
| Content-Type | Descrição |
|--------------|-----------|
| `application/json` | Dados no formato JSON |
| `text/html` | Conteúdo HTML |
| `text/plain` | Texto simples |
| `application/xml` | Dados XML |
| `multipart/form-data` | Formulários com upload de arquivos |
| `application/x-www-form-urlencoded` | Dados de formulário simples |

## Accept
O Accept é um cabeçalho HTTP que:
- Especifica quais tipos de conteúdo o cliente aceita como resposta
- Permite negociação de conteúdo entre cliente e servidor
- Pode incluir múltiplos tipos com prioridades
- Podemos também versionar a api, passando a versão no como application/vnd.ecommerce.v2+json

### Exemplos de Uso:
```http
GET /api/produtos
Accept: application/json

// Múltiplos tipos com prioridade (q-value)
GET /api/produtos
Accept: application/json;q=1.0, application/xml;q=0.8
```

### Tabela Comparativa:
| Característica | Content-Type | Accept |
|----------------|--------------|--------|
| **Direção** | Define o formato do conteúdo sendo **enviado** | Define os formatos que podem ser **recebidos** |
| **Uso** | Usado pelo remetente da mensagem | Usado pelo destinatário para indicar preferências |
| **Momento** | Na requisição: indica formato do body enviado<br>Na resposta: indica formato do body retornado | Na requisição: indica formatos aceitos para resposta |
| **Exemplo** | `Content-Type: application/json` | `Accept: application/json, text/plain` |


## CORS (Cross-Origin Resource Sharing)

CORS é um mecanismo de segurança que:
- Controla quais origens podem acessar recursos da API
- Previne requisições não autorizadas de outros domínios
- Utiliza headers HTTP para definir permissões

### Funcionamento do CORS:
1. Navegador envia requisição OPTIONS (preflight)
2. Servidor responde com políticas CORS
3. Se permitido, navegador envia requisição real

### Headers CORS Principais:
| Header | Descrição |
|--------|-----------|
| `Access-Control-Allow-Origin` | Origens permitidas |
| `Access-Control-Allow-Methods` | Métodos HTTP permitidos |
| `Access-Control-Allow-Headers` | Headers permitidos |
| `Access-Control-Max-Age` | Tempo de cache do preflight |

### Exemplo de Preflight OPTIONS:
```http
// Requisição OPTIONS (Preflight)
OPTIONS /api/recursos
Origin: https://app.exemplo.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

// Resposta do Servidor
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.exemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 3600
```

### Configuração Express:
```javascript
// filepath: server.js
app.use(cors({
  origin: 'https://app.exemplo.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```


### O que é Hypermedia?

Hypermedia significa usar links e metadados em respostas de API para fornecer informações sobre as ações que podem ser realizadas em relação aos recursos. Esses links ajudam os clientes a navegar pela API sem precisar de conhecimento prévio sobre a estrutura dela.

omo funciona?

Quando um cliente faz uma requisição para a API, a resposta inclui:

    Dados do recurso atual: As informações solicitadas.
    Links para outros recursos ou ações: URLs que representam as próximas ações possíveis.

Exemplo de uma resposta em formato JSON com hipermídia:
```json
{
  "id": 123,
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "_links": {
    "self": {
      "href": "/users/123"
    },
    "edit": {
      "href": "/users/123/edit"
    },
    "delete": {
      "href": "/users/123/delete"
    }
  }
}
```
### Benefícios do uso de Hypermedia:

    Descoberta dinâmica: O cliente não precisa conhecer a estrutura da API antecipadamente.
    Facilidade de manutenção: Mudanças na API podem ser feitas sem quebrar clientes existentes, pois as interações são baseadas em links fornecidos nas respostas.
    Orientação clara: O cliente sabe exatamente quais ações estão disponíveis em cada estado do recurso.