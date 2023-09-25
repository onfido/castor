import { Accordion, Icon, type AccordionProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/Accordion',
  component: Accordion,
  args: {
    list: [
      {
        title: <>Long text</>,
        name: '1',
        iconName: 'book-open',
        content: (
          <div style={{ overflow: 'hidden' }}>
            <p style={{ margin: '0 0 8px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum non augue facilisis, accumsan magna ut, tempus turpis.
              Aenean quis bibendum nulla, ut luctus arcu. Sed et porta ante.
              Donec commodo mi sit amet est pharetra, ut sagittis velit rhoncus.
              Fusce risus arcu, feugiat a dapibus eget, commodo eleifend dui.
              Nunc quam leo, aliquam id nisi a, dictum eleifend orci. Morbi
              lacinia felis dolor, sed sagittis nisi hendrerit ut. Phasellus
              iaculis rutrum ipsum in sollicitudin. Mauris faucibus commodo
              elementum. Nunc in augue sit amet sem elementum congue. Fusce
              mollis lorem augue. Aenean quis sem iaculis, tempor nunc ut,
              sollicitudin risus. Nulla sem sem, bibendum eu velit vel, semper
              placerat risus.
            </p>
            <p style={{ margin: '0 0 8px' }}>
              Nunc aliquam elit erat, semper egestas nisi volutpat non. Duis sed
              ultrices ipsum. Nulla non nisl a magna sodales interdum tempor ut
              mi. Quisque ut aliquet sem. Aliquam erat volutpat. In molestie
              fermentum mi eu scelerisque. Vestibulum in lacinia quam.
            </p>
            <p style={{ margin: '0 0 8px' }}>
              Integer sit amet tristique est. Nunc porttitor nunc nec luctus
              dignissim. Integer at nisi ipsum. Cras aliquet justo leo, a
              condimentum dolor imperdiet quis. Cras viverra erat at ornare
              venenatis. Donec in facilisis mauris. Aliquam sit amet maximus
              ligula. Proin gravida elit mi, eget maximus mi consequat auctor.
              Aliquam erat volutpat.
            </p>
            <p style={{ margin: '0 0 8px' }}>
              Nunc ultrices ligula sit amet elit placerat, eu rutrum massa
              bibendum. Praesent et pulvinar ipsum. Vestibulum justo justo,
              auctor sed ligula sit amet, posuere maximus ipsum. Aenean nec arcu
              dui. Integer non sagittis nisi. Aenean placerat vehicula lacinia.
              Mauris blandit massa dui. Vivamus ut nisl nunc. Suspendisse non
              risus non nibh mattis maximus at id enim. Mauris bibendum est
              eros, eu consequat tellus finibus eu. Sed euismod nec tellus ac
              elementum. Duis non lectus congue, rhoncus mi eget, vestibulum
              odio. Morbi iaculis venenatis augue non euismod.
            </p>
            <p style={{ margin: '0' }}>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Ut lectus elit, mollis ut lectus
              at, tempor bibendum purus. Donec volutpat facilisis mi, id laoreet
              purus fermentum a. Proin pharetra tristique magna, non fermentum
              odio accumsan in. In neque odio, pretium at lectus nec, pulvinar
              eleifend massa. Sed placerat urna at lorem auctor rhoncus. Morbi
              metus ligula, ullamcorper ut erat fringilla, congue tempor arcu.
              Vestibulum dapibus nec elit et iaculis.
            </p>
          </div>
        ),
      },
      {
        title: <>List</>,
        iconName: 'list-ul',
        name: '2',
        content: (
          <ul>
            <li>Mercury</li>
            <li>Venus</li>
            <li>Earth</li>
            <li>Mars</li>
            <li>Jupiter</li>
            <li>Saturn</li>
            <li>Uranus</li>
            <li>Neptune</li>
          </ul>
        ),
      },
      {
        title: <>Empty</>,
        name: '2',
        secondaryContent: <Icon name="error-circle" aria-hidden="true" />,
        content: (
          <div style={{ padding: 100, textAlign: 'center' }}>
            Nothing to see here.
          </div>
        ),
      },
    ],
  },
  parameters: {},
} as Meta<AccordionProps>;

export const Playground: Story<AccordionProps> = {};
export const Separated: Story<AccordionProps> = {
  render: (props) => <Accordion {...props} separated />,
};
export const WithSeparator: Story<AccordionProps> = {
  render: (props) => <Accordion {...props} withSeparator />,
};
export const OnlyOneOpen: Story<AccordionProps> = {
  render: (props) => <Accordion {...props} onlyOneOpen />,
};
