import { registerFormFields, connect } from '@formily/antd'
import Password from './Password'

registerFormFields({
  'xm-password': connect()(Password)
})
