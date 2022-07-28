/** ============================================================================
    Project: .clockwork
    ----------------------------------------------------------------------------
    @description: Clockwork: uma biblioteca CSS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

import { join } from 'path';

const insertIcon = (icon) => {
  return join(__dirname, `${app.path.icon}/${icon}`);
}

let paths = {
  root: {
    src: './src',
    dest: './resources'
  },
  css: {
    src: './src/scss',
    dest: './resources/css'
  },
  icons: {
    src: './src/icons'
  },
  js: {
    src: './src/js',
    dest: './resources/js'
  }
}

let app = {
  name: '.clockwork',
  appID: '.clockwork',
  path: {
    icon: paths.icons.src
  },
  icon: {
    gulp: 'icon-gulp.png',
    error: 'icon-error.png',
    success: 'icon-success.png'
  },
  message: {
    gulp : {
      success: 'GulpJS is running and works like a charm.'
    },
    css: {
      title: 'CSS',
      error: 'Houve falha na transpilação dos arquivos.\nConsulte o Terminal para checar o log de erros.',
      success: 'Arquivos CSS transpilados com sucesso!'
    },
    js: {
      title: 'Javascript',
      error: 'Há um ou mais arquivos JS com erro. Verifique o terminal.',
      success: 'Um arquivo JS foi gerado com sucesso.'
    }
  }
}

let messages = {
  gulp: {
    isRunning: {
      title: app.name,
      message: app.message.gulp.success,
      icon: insertIcon(app.icon.gulp),
      appID: app.appID
    }
  },
  css: {
    cssErrorMessage: app.message.css.error,
    error: {
      title: app.message.css.title,
      icon: insertIcon(app.icon.error),
      appID: app.appID
    },
    success: {
      title: app.message.css.title,
      message: app.message.css.success,
      icon: insertIcon(app.icon.success),
      appID: app.appID,
      onLast: true
    }
  },
  js: {
    jsErrorMessage: app.message.js.error,
    error: {
      title: app.message.js.title,
      icon: insertIcon(app.icon.error),
      appID: app.appID
    },
    success: {
      title: app.message.js.title,
      message: app.message.js.success,
      icon: insertIcon(app.icon.success),
      appID: app.appID
    }
  }
}

export default {
  paths,
  app,
  messages
}
