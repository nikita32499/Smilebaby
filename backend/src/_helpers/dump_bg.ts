import { exec } from 'child_process';

const dumpDatabase = async (
    dbname: string,
    username: string,
    password: string,
    host: string,
    port: number,
) => {
    const dumpFile = `./${dbname}_dump.sql`; // Путь к файлу дампа

    // Строка для выполнения команды pg_dump
    const command = `PGPASSWORD=${password} pg_dump -U ${username} -h ${host} -p ${port} -F c -b -v -f ${dumpFile} ${dbname}`;

    return new Promise<void>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
    });
};

// Пример вызова
dumpDatabase('mydatabase', 'myuser', 'mypassword', 'localhost', 5432)
    .then(() => console.log('Database dump completed'))
    .catch((err) => console.error('Error creating dump', err));
