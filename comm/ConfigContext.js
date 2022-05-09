import Config from '../Config.json';
import DeviceStorage from './DeviceStorage';
import React, { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = props => {
  const [config, setConfig] = useState({})
  useEffect(() => {
    const configset = async () => {
      let defaultUrl = (await DeviceStorage.get("defaultUrl")) ?? Config.defaultUrl;
      let defaulUserId = (await DeviceStorage.get("UserId")) ?? Config.UserId;
      setConfig({
        UserId: defaulUserId,
        Url: defaultUrl
      });
    }
    configset();
  }, []);
  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {props.children}
    </ConfigContext.Provider>
  )
}