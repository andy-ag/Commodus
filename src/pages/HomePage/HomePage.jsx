import './HomePage.css';
import Table from '../../components/Table.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function HomePage({commodities}) {
  const [isLoading, setIsLoading] = useState(true);
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      toastIdRef.current = toast.loading('Getting latest data', {
        iconTheme: {
          primary: 'var(--accent)',
          secondary: 'white',
        },
      })
    } else {
      toast.dismiss(toastIdRef.current);
    }
  }, [isLoading]);

  useEffect(() => {
    if (commodities !== null) {
      setIsLoading(false);
    }
  }, [commodities]);
  
  if (isLoading) {
    return(
      <main>
        <div className="d-flex flex-column align-items-center">
            <HeaderBox text={'All commodities'} add={false} fav={false}/>
        </div>
      </main>
    );  // Show a loading message while the data is being fetched
  }

  return (
      <main>
        <div className="d-flex flex-column align-items-center">
            <HeaderBox text={'All commodities'} add={false} fav={false}/>
            <Table commodities={commodities}/>
        </div>
      </main>
    );
  }