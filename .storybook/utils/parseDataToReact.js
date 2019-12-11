import React from 'react'
import { BlockContent } from '../components/BlockContent'

export const parseDataToReact = ({ pages, title }) => {
    return {
        title,
        pages: pages.map(page => page.title),
        children: pages.map(page => {
            const hasParent = !!page.parent
            return {
                title: page.title,
                parent: hasParent && page.parent,
                storybookTitle: !hasParent ? page.title : `${title}|${page.parent}`,
                component: BlockContent,
                props: Object.assign({ parentKey: !hasParent ? page.title : `${title}|${page.parent}` }, page)
            }
        })
    }
}