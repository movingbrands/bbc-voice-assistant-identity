import React from 'react'

import { P } from 'Components/Typography'

export const Small = ({ children, ...rest }) =>
    <P {...rest}>
        <small>{children}</small>
    </P>

Small.defaultProps = {
    gel: "minion"
}
