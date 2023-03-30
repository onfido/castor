import { c, classy } from '@onfido/castor';
import { IconName } from '@onfido/castor-icons';
import React from 'react';
import { Icon } from '../../components';

interface Props {
  icon?: JSX.Element;
  name: IconName;
}

export const MaybeIcon = ({ icon, name }: Props) =>
  icon ? (
    <div className={classy(c('icon'))}>{icon}</div>
  ) : (
    <Icon name={name} aria-hidden="true" />
  );
