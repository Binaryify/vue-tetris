import { i18n, lan } from '../../unit/const'
export default {
  name: 'Decorate',
  computed: {
    title: () => i18n.title[lan],
    github: () => i18n.github[lan],
    QRTitle: () => i18n.QRNotice[lan],
    QRCode: () => i18n.QRCode[lan]
  }
}
