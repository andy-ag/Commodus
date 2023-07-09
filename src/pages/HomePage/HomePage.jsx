import './HomePage.css';
import Table from '../../components/Table.jsx'

export default function HomePage({commodities}) {
    return (
      <main>
        <div>
            <Table commodities={commodities}/>
        </div>
      </main>
    );
  }