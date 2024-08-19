import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

interface TimeZoneSelectProps {
    country: string;
    onChange: (timeZone: string) => void;
  }
  
  const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({ country, onChange }) => {
    const [timeZones, setTimeZones] = useState<string[]>([]);
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
  
    useEffect(() => {
      if (country) {
        const zones = moment.tz.zonesForCountry(country);
        setTimeZones(zones || []);
        setSelectedTimeZone('');
      }
    }, [country]);
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const zone = e.target.value;
      setSelectedTimeZone(zone);
      onChange(zone);
    };

  return (
    <div>
      <label htmlFor="timezone">Time Zone:</label>
      <select
        id="timezone"
        value={selectedTimeZone}
        onChange={handleChange}
        disabled={!country}
      >
        <option value="">Select a time zone</option>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeZoneSelect;