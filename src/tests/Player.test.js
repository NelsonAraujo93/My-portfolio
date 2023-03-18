import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Player from '../components/Player';

describe('Tests for <Player /> component', () => {
  const data = {
    firstname: 'Nelson',
    lastname: 'Araujo',
    leagues: { standard: { jersey: 23, pos: 'FC' } },
    birth: { date: '1996-10-24' },
  };

  it('Should match the snapshot', () => {
    expect(renderer.create(<Player data={data} />).toJSON()).toMatchSnapshot();
  });

  it('Should render all rockets children', () => {
    render(<Player data={data} />);
    expect(screen.queryByTestId('player-container').children.length).toBe(5);
  });
});
