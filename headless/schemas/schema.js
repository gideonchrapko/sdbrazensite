import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import productImages from './productImages'
import blockContent from './blockContent'
import returnPolicy from './returnPolicy'

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    productImages,
    blockContent,
    returnPolicy,
  ]),
})
