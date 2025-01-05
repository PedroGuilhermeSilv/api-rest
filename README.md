## O que é uma api REST


## Modelo de maturidade de Richardson
Para considerar uma API Rest ele deve atingir os seguintes niveis.

![image](./imgs/overview.png)

- `Level 0`: Uso apenas do http e json.
- `Level 1`: Uso dos recursos e padronização como de rotas `/products`
- `Level 2`: Integração das prodonização com os verbos http.
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
- **Definição**: Cada requisição do cliente ao servidor deve conter todas as informações necessárias para ser processada.
  - O servidor não armazena informações de contexto entre requisições.
- **Exemplo**: Se o cliente faz uma requisição `GET /usuarios`, ele deve incluir tokens de autenticação (se necessário) para validação.
- **Benefício**: Simplifica o gerenciamento de sessões e facilita a escalabilidade.

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

