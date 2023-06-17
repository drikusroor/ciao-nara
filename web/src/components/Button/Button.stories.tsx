// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Button> = (args) => {
//   return <Button {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Button from './Button'

export const generated = () => {
  return <Button text="Click me!" />
}

export const CobaltBlue = () => {
  return <Button text="Click me!" color="cobalt-blue" />
}

export const MonzaRed = () => {
  return <Button text="Click me!" color="monza-red" />
}

export const CustomClass = () => {
  return (
    <Button
      text="Click me!"
      className="bg-slate-500 text-white hover:bg-slate-400"
    />
  )
}

export const CustomText = () => {
  return <Button text="Lol!" />
}

export const CustomChildren = () => {
  return (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  )
}

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>
