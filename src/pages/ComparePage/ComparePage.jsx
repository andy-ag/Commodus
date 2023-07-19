import { useState, useEffect, useRef } from 'react';
import ComparePlot from '../../components/ComparePlot.jsx';
import StatsTable from '../../components/StatsTable.jsx';
import './ComparePage.css'
import HeaderBox from '../../components/HeaderBox';
import { toast } from 'react-hot-toast';
const commodityList = require('../../../src/utilities/filteredResults_final.json')


export default function ComparePage() {
    const [selectedCommodity1, setSelectedCommodity1] = useState({data: null, commName: null, freq: null, apiParams: null});
    const [selectedCommodity2, setSelectedCommodity2] = useState({data: null, commName: null, freq: null, apiParams: null});
    const [stats, setStats] = useState(null);
    const [commodityData1, setCommodityData1] = useState(null);
    const [commodityData2, setCommodityData2] = useState(null);
    const [loadingCount, setLoadingCount] = useState(0);
    const toastId = useRef(null);

    useEffect(() => {
        async function fetchData1() {
            if (selectedCommodity1.apiParams) {
                setLoadingCount((count) => count + 1);
                if (loadingCount === 0) { // only create a new toast if there isn't one already
                    toastId.current = toast.loading('Loading data', {
                        iconTheme: {
                            primary: 'var(--accent)',
                            secondary: 'white',
                        },
                    });
                }
                const res = await fetch(`/api/commodities/${encodeURIComponent(selectedCommodity1.apiParams)}`);
                const data = await res.json();
                setLoadingCount((count) => count - 1);
                if (loadingCount === 0) { // only dismiss the toast when both datasets have been fetched
                    toast.dismiss(toastId.current);
                }
                setCommodityData1(data);
            }
        }
        fetchData1();
    }, [selectedCommodity1.apiParams]);

    useEffect(() => {
        async function fetchData2() {
            if (selectedCommodity2.apiParams) {
                setLoadingCount((count) => count + 1);
                if (loadingCount === 0) { // only create a new toast if there isn't one already
                    toastId.current = toast.loading('Loading data', {
                        iconTheme: {
                            primary: 'var(--accent)',
                            secondary: 'white',
                        },
                    });
                }
                const res = await fetch(`/api/commodities/${encodeURIComponent(selectedCommodity2.apiParams)}`);
                const data = await res.json();
                setLoadingCount((count) => count - 1);
                if (loadingCount === 0) { // only dismiss the toast when both datasets have been fetched
                    toast.dismiss(toastId.current);
                }
                setCommodityData2(data);
            }
        }
        fetchData2();
    }, [selectedCommodity2.apiParams]);

    const handleCommodityChange1 = (e) => {
        const commodityInfo = commodityList.find(com => com.apiParams === e.target.value);
        setSelectedCommodity1({...selectedCommodity1, commName: commodityInfo.name, freq: commodityInfo.frequency, apiParams: e.target.value});
    };

    const handleCommodityChange2 = (e) => {
        const commodityInfo = commodityList.find(com => com.apiParams === e.target.value);
        setSelectedCommodity2({...selectedCommodity2, commName: commodityInfo.name, freq: commodityInfo.frequency, apiParams: e.target.value});
    };

    const handleCompareClick = async () => {
        if (selectedCommodity1.apiParams && selectedCommodity2.apiParams) {
            const compareToastId = toast.loading('Crunching the numbers', {
                iconTheme: {
                    primary: 'var(--accent)',
                    secondary: 'white',
                },
            });
            try {
                const res = await fetch(`/api/commodities/compare/${encodeURIComponent(selectedCommodity1.apiParams)},${encodeURIComponent(selectedCommodity2.apiParams)}`);
                const data = await res.json();
                setStats(data);
                toast.dismiss(compareToastId);
            } catch (error) {
                console.log('Error comparing commodities:', error);
                toast.error('Error comparing commodities', {
                    iconTheme: {
                        primary: '#CE2D4F',
                        secondary: 'white',
                    },
                });
            }
            
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center mb-4">
                        <HeaderBox text={'Compare'} add={false} fav={false} info={true}/>
                    </div> 
            <div className="d-flex justify-content-center my-4 gap-2 align-items-center">
                <select className="form-select compare-form" onChange={handleCommodityChange1}>
                    <option>Pick commodity</option>
                    {commodityList.map(commodity => (
                        commodity.apiParams !== selectedCommodity2.apiParams &&
                        <option key={commodity.apiParams} value={commodity.apiParams}>{commodity.name}</option>
                    ))}
                </select>

                <select className="form-select compare-form" onChange={handleCommodityChange2}>
                    <option>Pick commodity</option>
                    {commodityList.map(commodity => (
                        commodity.apiParams !== selectedCommodity1.apiParams &&
                        <option key={commodity.apiParams} value={commodity.apiParams}>{commodity.name}</option>
                    ))}
                </select>

                <button className="compare-button d-flex align-items-center" onClick={handleCompareClick}>Analyse</button>
            </div>

            {(commodityData1 && commodityData2) && <ComparePlot 
            data1={commodityData1.raw_time_series}
            data2={commodityData2.raw_time_series}
            timePeriod={'all'}
            frequency1={selectedCommodity1.freq}
            frequency2={selectedCommodity2.freq}
            name1={selectedCommodity1.commName}
            name2={selectedCommodity2.commName}
            plotId={'compare'}
            />}

            {stats && <StatsTable stats={stats} />} 
        </div>
    );
}
