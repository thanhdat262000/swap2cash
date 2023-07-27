import Image from 'next/image';
import {
  BSCMainnetChainIdDec,
  BSCTestnetChainIdDec,
  EtherMainnetChainIdDec,
  EtherTestnetChainIdDec,
  PolygonMainnetChainIdDec,
  PolygonTestnetChainIdDec,
} from 'connectors/constants';

export const CHAINID_OPTIONS =
  process.env.NEXT_PUBLIC_IS_DEV === 'true'
    ? [
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/binance.png" width={20} height={20} alt="bsc" />

              <span>BSC</span>
            </div>
          ),
          value: BSCTestnetChainIdDec,
        },
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/eth.png" width={20} height={20} alt="ethereum" />
              <span>Ethereum </span>
            </div>
          ),
          value: EtherTestnetChainIdDec,
        },
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/matic.png" width={20} height={20} alt="ethereum" />
              <span>Polygon </span>
            </div>
          ),
          value: PolygonTestnetChainIdDec,
        },
      ]
    : [
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/binance.png" width={20} height={20} alt="bsc" />

              <span>BSC</span>
            </div>
          ),
          value: BSCMainnetChainIdDec,
        },
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/eth.png" width={20} height={20} alt="ethereum" />
              <span>Ethereum </span>
            </div>
          ),
          value: EtherMainnetChainIdDec,
        },
        {
          name: (
            <div className="h-full flex items-center space-x-2">
              <Image src="/images/chain/matic.png" width={20} height={20} alt="ethereum" />
              <span>Polygon </span>
            </div>
          ),
          value: PolygonMainnetChainIdDec,
        },
      ];
