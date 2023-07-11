import './HomePage.css';
import Table from '../../components/Table.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'

export default function HomePage({commodities}) {
  if (commodities === null) {
    return <div>Loading...</div>;  // Show a loading message while the data is being fetched
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