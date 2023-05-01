import { Dna } from 'react-loader-spinner'

export default function LoadingDNA() {
    return (
      <div className="loading">
        <Dna
          visible={true}
          width="90%"
          height="90%"
          ariaLabel="dna-loading"
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }