module.exports = {
        apps: [
                {
                        name: 'UnileverApp',
                        exec_mode: 'cluster',
                        instances: 'max',
                        script: './.output/server/index.mjs',
                        watch: 'true',
                        max_memory_restart: '512M',
                        watch: 'true',
                        port: 3000
                }
        ]
}