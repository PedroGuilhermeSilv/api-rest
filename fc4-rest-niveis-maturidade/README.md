# Curso REST

## Exemplo REST meia boca para E-commerce



| Operação                                      | Método HTTP | Caminho                                          |
|-----------------------------------------------|-------------|--------------------------------------------------|
| JWT login                                     | POST        | /jwt/login                                       |
| Session login                                 | POST        | /session/login                                   |
| Session logout                                | POST        | /session/logout                                  |
| Criar cliente                                 | POST        | /customers                                       |
| Obter cliente por ID                          | GET         | /admin/customers/{{ customer_id }}               |
| Listar clientes com paginação e filtro        | GET         | /admin/customers?page=1&limit=10                 |
| Atualizar cliente                             | POST        | /admin/customers/{{ customer_id }}               |
| Deletar cliente                               | POST        | /admin/customers/{{ customer_id }}/delete        |
| Criar categoria                               | POST        | /admin/categories                                |
| Obter categoria por ID                        | GET         | /categories/{{ category_slug }}                  |
| Listar categorias com paginação e filtro      | GET         | /categories?page=1&limit=10&name=Category        |
| Listar categorias no admin com paginação      | GET         | /admin/categories?page=1&limit=10&name=Category  |
| Atualizar categoria                           | POST        | /admin/categories/{{ category_id }}              |
| Deletar categoria                             | POST        | /admin/categories/{{ category_id }}/delete       |
| Criar produto                                 | POST        | /admin/products                                  |
| Obter produto por ID                          | GET         | /admin/products/{{ product_id }}                 |
| Obter produto por slug                        | GET         | /products?slug={{ product_slug }}                |
| Atualizar produto                             | POST        | /admin/products/{{ product_id }}                 |
| Deletar produto                               | POST        | /admin/products/{{ product_id }}/delete          |
| Listar produtos com paginação e filtro        | GET         | /products?page=1&limit=10                        |
| Listar produtos no admin com paginação        | GET         | /admin/products?page=1&limit=10&name=Product     |
| Obter CSV de produtos                         | GET         | /admin/products.csv                              |
| Adicionar item ao carrinho                    | POST        | /cart/items                                      |
| Obter carrinho por ID                         | GET         | /cart/{{ cart_id }}                              |
| Remover item do carrinho                      | POST        | /cart/items/1/remove                             |
| Limpar carrinho                               | POST        | /cart/clear                                      |
| Criar pedido                                  | POST        | /orders                                          |
| Listar pedidos com paginação e filtro         | GET         | /orders?page=1&limit=10                          |
