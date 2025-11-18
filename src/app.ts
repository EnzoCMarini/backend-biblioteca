import { server } from "./server.js"; // Importa o servidor HTTP
import { DatabaseModel } from "./model/DatabaseModel.js";

const port: number = 3333; // Define a porta que o servidor vai executar

// Liga o servidor HTTP
new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        })
    } else {
        console.log('Não foi possível conectar ao banco de dados');
    }
})
 
server.listen(port, () => {
    console.log(`Servidor executando no endereço: http://local:${port}`);
})