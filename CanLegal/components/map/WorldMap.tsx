'use client';

import { useMemo, useRef, useState } from 'react';
import type { FocusEvent, MouseEvent } from 'react';

import worldGeo from '@/data/world-geo.json';
import type { Country, GeoCollection, GeoFeature } from '@/lib/data/types';
import { STATUS_LABELS, statusColorHex } from '@/lib/constants';
import MapLegend from './MapLegend';
import MapTooltip from './MapTooltip';

const VIEWBOX = { width: 800, height: 420 };

type WorldMapProps = {
  countries: Country[];
  filteredCountries: Country[];
  isFiltered: boolean;
};

function projectPoint([lon, lat]: number[]) {
  const x = ((lon + 180) / 360) * VIEWBOX.width;
  const y = ((90 - lat) / 180) * VIEWBOX.height;
  return [x, y];
}

function buildPath(feature: GeoFeature) {
  return feature.geometry.coordinates
    .map((ring) =>
      ring
        .map((point, index) => {
          const [x, y] = projectPoint(point);
          return `${index === 0 ? 'M' : 'L'}${x} ${y}`;
        })
        .join(' ') + ' Z',
    )
    .join(' ');
}

export default function WorldMap({ countries, filteredCountries, isFiltered }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCountry, setActiveCountry] = useState<Country | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const geo = worldGeo as GeoCollection;
  const hasGeo = Array.isArray(geo?.features) && geo.features.length > 0;

  const countryByCode = useMemo(
    () => new Map(countries.map((country) => [country.code, country])),
    [countries],
  );

  const activeCodes = useMemo(
    () => new Set(filteredCountries.map((country) => country.code)),
    [filteredCountries],
  );

  const featurePaths = useMemo(() => {
    if (!hasGeo) return [];
    return geo.features.map((feature) => ({
      feature,
      path: buildPath(feature),
    }));
  }, [geo.features, hasGeo]);

  const updateTooltipPosition = (event: MouseEvent | FocusEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = 'clientX' in event ? event.clientX : rect.left + rect.width / 2;
    const clientY = 'clientY' in event ? event.clientY : rect.top + rect.height / 2;
    setTooltipPos({
      x: Math.min(Math.max(clientX - rect.left, 16), rect.width - 180),
      y: Math.min(Math.max(clientY - rect.top, 16), rect.height - 120),
    });
  };

  const handleActivate = (country: Country, event: MouseEvent | FocusEvent) => {
    setActiveCountry(country);
    updateTooltipPosition(event);
  };

  if (countries.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-80 w-full items-center justify-center rounded-2xl border border-line/40 bg-surface/70 text-sm text-muted">
          No geographic data available.
        </div>
      </div>
    );
  }

  if (!hasGeo) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-80 w-full items-center justify-center rounded-2xl border border-line/40 bg-surface/70 text-sm text-muted">
          Map data unavailable. Showing list view only.
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {countries.map((country) => (
            <div key={country.code} className="rounded-2xl border border-line/40 bg-surface/70 p-4">
              <p className="text-sm font-semibold">{country.name}</p>
              <p className="text-xs text-muted">{STATUS_LABELS[country.status]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="map-frame relative overflow-hidden rounded-3xl border border-line/40 bg-surface/60 p-4"
        onMouseLeave={() => setActiveCountry(null)}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="h-[460px] w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="World map showing cannabis policy status by country"
        >
          <g>
            {featurePaths.map(({ feature, path }) => {
              const isCountry = feature.properties.kind === 'country';
              const code = feature.properties.code;
              const country = code ? countryByCode.get(code) : undefined;
              const isActive = !isFiltered || (code ? activeCodes.has(code) : true);
              const fill = isCountry && country ? statusColorHex(country.status) : 'rgb(var(--highlight))';
              const fillOpacity = isCountry ? (isActive ? 0.88 : 0.18) : 0.45;

              return (
                <path
                  key={feature.id}
                  d={path}
                  fill={fill}
                  fillOpacity={fillOpacity}
                  stroke="rgb(var(--line))"
                  strokeWidth={isCountry ? 0.6 : 0.4}
                  className={isCountry ? 'transition-all duration-300 ease-out' : 'opacity-60'}
                  tabIndex={isCountry && country ? 0 : -1}
                  role={isCountry ? 'button' : 'presentation'}
                  aria-label={
                    country
                      ? `${country.name}, ${country.region}, ${STATUS_LABELS[country.status]}`
                      : feature.properties.name
                  }
                  onMouseMove={(event) => {
                    if (!country) return;
                    handleActivate(country, event);
                  }}
                  onFocus={(event) => {
                    if (!country) return;
                    handleActivate(country, event);
                  }}
                  onBlur={() => setActiveCountry(null)}
                />
              );
            })}
          </g>
        </svg>
        {activeCountry ? <MapTooltip country={activeCountry} position={tooltipPos} /> : null}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <MapLegend />
        <span>{countries.length} countries indexed</span>
      </div>
    </div>
  );
}
