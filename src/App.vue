<template>
  <div class="container">
    <guac-client :query="query" :force-http="forceHttp" />
  </div>
</template>

<script>
  import GuacClient from '@/components/GuacClient'

  export default {
    name: 'app',
    components: {
      GuacClient
    },

    data() {
      return {
        connect: false,
        scheme: 'rdp',
        hostname: 'localhost',
        port: '',
        user: '',
        pass: '',
        ignoreCert: true,
        security: '',
        forceHttp: false,
      }
    },
    computed: {
      queryObj() {
        const urlParams = new URLSearchParams(window.location.search)
        let scheme = urlParams.get("scheme")
        if(!scheme) {
          scheme = this.scheme
        }
        let hostname = urlParams.get("hostname")
        if(!hostname) {
          hostname = this.hostname
        }
        let port = urlParams.get("port")
        if(!port) {
          port = this.port
        }

        return {
          scheme: scheme,
          hostname: hostname,
          port: port,
          'ignore-cert': this.ignoreCert,
          security: this.security,
          username: this.user,
          password: this.pass,
          width: 1553,
          height: 874,
        }
      },
      query() {
        const queryString = []
        for (const [k, v] of Object.entries(this.queryObj)) {
          if (v) {
            queryString.push(`${k}=${encodeURIComponent(v)}`)
          }
        }
        return queryString.join("&")
      },
      scrubbedQuery() {
        return this.query.replace(/password=[^& ]+/, 'password=****')
      }
    },
    methods: {
      doConnect() {
        if (window.localStorage) {
          window.localStorage.setItem('query', JSON.stringify(this.queryObj))
        }
        this.connect = true
      }
    },
    mounted() {
      if (window.localStorage && window.localStorage.getItem('query')) {
        let query
        try {
          query = JSON.parse(window.localStorage.getItem('query'))
        } catch (e) {
          window.localStorage.setItem('query', '{}')
          return
        }
        this.scheme = query.scheme
        this.hostname = query.hostname
        this.port = query.port
        this.ignoreCert = query['ignore-cert']
        this.nla = query.nla
        this.user = query.username
        this.pass = query.password
      }
    }
  }
</script>

<style>
    html, body {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 16pt;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 1rem;
    }

    h1 {
        text-align: center;
    }

    .field {
        display: grid;
        grid-template-columns: 300px 1fr;
        margin-bottom: 1rem;
    }

    label {
        text-align: right;
    }

    label::after {
        content: ': '
    }

    input {
        margin-left: 1rem;
        margin-right: 1rem;
        font-size: 16pt;
        border: 1px solid black;
        border-radius: 2px;
        padding-left: 0.5rem;
    }

    .center {
        text-align: center;
    }

    .connect {
        font-size: 16pt;
        background: none;
        border: 1px solid black;
        border-radius: 5px;
        padding: .5rem 1rem;
    }

    .pl-1 {
        padding-left: 1rem;
    }
</style>
