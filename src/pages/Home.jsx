
import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { cities, findCity } from '../data/cities.js'
import { level } from '../lib/aqi.js'
import s from './Home.module.css'
import { Thermometer, Wind, Cloud } from 'lucide-react'

const QUICK_CITIES = cities.slice(0, 4)

const QUICK_CITY_DETAILS = [
  { temperature: 29, pm25: 12, pm10: 24 },
  { temperature: 31, pm25: 25, pm10: 42 },
  { temperature: 25, pm25: 38, pm10: 61 },
  { temperature: 32, pm25: 55, pm10: 83 },
]

export default function Home() {
  const [name, setName] = useState('Jakarta')
  const city = findCity(name)
  const lv = level(city.aqi)

  return (
    <>
      <title>KADAR · Kabar Udara</title>

      {/* HERO */}
      <section className={s.hero}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <div className={s.eyebrow}>
              <i />
              KENALI UDARA DI SEKITARMU
            </div>

            <h1>
              Udara yang baik,
              <br />
              <em>awal hidup</em> yang lebih baik.
            </h1>

            <p className={s.heroLead}>
              Sebelum melangkah keluar, cari tahu kualitas udara di kotamu.
              KADAR membantumu memahami kondisi udara dan mengambil keputusan
              dengan lebih bijak.
            </p>

            <div className={s.heroButtons}>
              <Link className={s.featureCard} to="/pantau">
                <h3>Pantau kualitas udara</h3>
                <p>
                  Lihat kondisi dan informasi kualitas udara terkini di sekitarmu.
                </p>
                <b>
                  Jelajahi fitur <i><ArrowUpRight size={18} /></i>
                </b>
              </Link>

              <Link className={s.featureCard} to="/edukasi">
                <h3>Kenali kualitas udara</h3>
                <p>
                  Pelajari kategori AQI dan pahami arti kualitas udara bagi aktivitasmu.
                </p>
                <b>
                  Pelajari lebih lanjut <i><ArrowUpRight size={18} /></i>
                </b>
              </Link>
            </div>
          </div>

          {/* Ilustrasi hero */}
          <div className={s.heroVisual} aria-label="Ilustrasi langit cerah">
            <div className={`${s.orbit} ${s.orbitOne}`} />
            <div className={`${s.orbit} ${s.orbitTwo}`} />
            <div className={s.sunDisc} />

            <div className={`${s.cloud} ${s.cloudA}`} />
            <div className={`${s.cloud} ${s.cloudB}`} />

            <div className={`${s.windLine} ${s.windOne}`} />
            <div className={`${s.windLine} ${s.windTwo}`} />
            <div className={`${s.windLine} ${s.windThree}`} />

            <div className={`${s.floatingCard} ${s.cardTop}`}>
              <span className={s.liveDot} />
              PENGUKUR KADAR UDARA INDONESIA
              <b>DEMO</b>
            </div>

            <div className={`${s.floatingCard} ${s.cardBottom}`}>
              <div className={s.miniLabel}>
                KUALITAS UDARA HARI INI · {city.name.toUpperCase()}
              </div>

              <div className={s.miniScore}>
                <strong style={{ color: lv.color }}>
                  {city.aqi}
                </strong>
                <span style={{ color: lv.color }}>
                  {lv.label.toUpperCase()}
                </span>
              </div>

              <div className={s.miniBar}>
                <i
                  style={{
                    width: `${Math.min(city.aqi, 150) / 150 * 100}%`,
                    backgroundColor: lv.color,
                  }}
                />
              </div>

              <small>Contoh data · {city.region}</small>
            </div>

            <div className={s.visualCaption}>
              Pantau Udara, Pahami Dampaknya.
            </div>
          </div>
        </div>
      </section>
      
{/* PANTAU SEKILAS */}
<section className={s.quickStrip}>
  <div className={`container ${s.quickInner}`}>

    {/* BAGIAN KIRI: DEKLARASI */}
    <div className={s.quickIntro}>
      <div className={`${s.eyebrow} ${s.quickEyebrow}`}> 
        <i />
        REALTIME AIR QUALITY
      </div>

      <h2>
        Pantau <em>Sekilas.</em>
      </h2>

      <p>
        Lihat gambaran kualitas udara di berbagai kota
        dan pahami kondisi lingkungan sebelum beraktivitas.
      </p>
      <p className={s.quickCityNote}>
          Data simulasi untuk kebutuhan demonstrasi.
      </p>
    </div>

    <div className={s.quickCities}>
      {QUICK_CITIES.map((c, index) => {
        const lv = level(c.aqi)
        const details = QUICK_CITY_DETAILS[index]

        return (
          <button
            key={c.name}
            className={s.quickCityCard}
            onClick={() => setName(c.name)}
            style={{ '--aqi-color': lv.color }}
          >
            {/* Nama kota dan status */}
            <div className={s.quickCityTop}>
              <strong>{c.name}</strong>
              <span className={s.quickCityStatus}>
                {lv.label}
              </span>
            </div>

            {/* Nilai AQI */}
            <div className={s.quickCityMetric}>
              <strong>{c.aqi}</strong>
              <span>AQI</span>
            </div>

            {/* Progress bar */}
            <div className={s.quickCityBar}>
              <i
                style={{
                  width: `${Math.min(c.aqi, 150) / 150 * 100}%`,
                  backgroundColor: lv.color,
                }}
              />
            </div>

            {/* Informasi tambahan */}
            <div className={s.quickCityDetails}>
              <div className={s.quickCityInfo}>
                <span>
                  <Thermometer size={14} />
                  Suhu
                </span>
                <strong>{details.temperature}°C</strong>
              </div>

              <div className={s.quickCityInfo}>
                <span>
                  <Wind size={14} />
                  PM2.5
                </span>
                <strong>{details.pm25} µg/m³</strong>
              </div>

              <div className={s.quickCityInfo}>
                <span>
                  <Cloud size={14} />
                  PM10
                </span>
                <strong>{details.pm10} µg/m³</strong>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  </div>
</section>


      {/* TENTANG KADAR */}
      <section className={s.aboutSection}>
        <div className={`container ${s.aboutGrid}`}>
          <div>
            <div className={s.eyebrow}>
              <i />
              TENTANG KADAR
            </div>

            <h2>
              Cek udara dulu,
              <br />
              <em>baru beraktivitas.</em>
            </h2>
          </div>

          <div className={s.aboutCopy}>
            <p>
              Udara tidak selalu terlihat buruk, tetapi dampaknya nyata bagi
              pernapasan. KADAR membantumu melihat kondisi udara sebelum
              olahraga, berangkat kerja, atau mengantar anak ke sekolah.
            </p>

            <Link className={s.primaryButton} to="/tentang">
              Tentang KADAR <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}