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