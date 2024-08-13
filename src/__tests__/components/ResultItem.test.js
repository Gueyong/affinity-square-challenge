import { render, screen } from '@testing-library/react';
import ResultItem from '@/components/ResultItem';
import { FaGlobe } from 'react-icons/fa';

describe('ResultItem Component', () => {
  it('should display the correct label and value', () => {
    render(<ResultItem icon={<FaGlobe />} label="HTML Version" value="HTML 5" />);

    expect(screen.getByText(/html version/i)).toBeInTheDocument();
    expect(screen.getByText(/html 5/i)).toBeInTheDocument();
  });
});
