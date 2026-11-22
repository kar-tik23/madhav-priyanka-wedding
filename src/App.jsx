import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, CalendarDays, Check, ChevronDown, Copy, Flower2, Heart,
  MapPin, Menu, Music2, Share2, Sparkles, X
} from "lucide-react";

const WEDDING_DATE = new Date("2026-12-30T00:00:00+05:30");
const VENUE = "Gujarati Bhavan, Old Police Line, Murarji Peth, Solapur, Maharashtra 413001";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VENUE);

function getCountdown() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Flower({ className = "" }) {
  return <div aria-hidden="true" className={`flower ${className}`}>
    <span>✿</span><i>✿</i>
  </div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", attendance: "joyfully-accept", guests: "2", message: "" });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateLabel = useMemo(() => new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata"
  }).format(WEDDING_DATE), []);

  const invitationText = "You're invited to celebrate the wedding of Madhav & Priyanka on 30 December 2026 at Gujarati Bhavan, Old Police Line, Murarji Peth, Solapur, Maharashtra 413001. " + MAPS_URL;

  async function shareInvite() {
    if (navigator.share) {
      try { await navigator.share({ title: "Madhav & Priyanka — Wedding Invitation", text: invitationText, url: window.location.href }); }
      catch (e) { /* share sheet dismissed */ }
    } else {
      await navigator.clipboard.writeText(invitationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  function addToCalendar() {
    const start = "20261230";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Madhav and Priyanka//Wedding//EN",
      "BEGIN:VEVENT", `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:20261231`,
      "SUMMARY:Madhav & Priyanka — Wedding Celebration",
      `LOCATION:${VENUE.replaceAll(",", "\\,")}`,
      "DESCRIPTION:Celebrating Madhav and Priyanka. Event timing to be confirmed.",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "madhav-priyanka-wedding.ics"; a.click();
    URL.revokeObjectURL(url);
  }

  async function copyAddress() {
    await navigator.clipboard.writeText(VENUE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function submitRsvp(e) {
    e.preventDefault();
    const response = [
      "Madhav & Priyanka — RSVP",
      `Name: ${rsvp.name}`,
      `Response: ${rsvp.attendance === "joyfully-accept" ? "Joyfully accepts" : "Regretfully declines"}`,
      `Guests: ${rsvp.guests}`,
      `Message: ${rsvp.message || "—"}`
    ].join("\n");
    if (navigator.share) navigator.share({ title: "Wedding RSVP", text: response }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(response).then(() => setRsvpDone(true));
    setRsvpDone(true);
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      {!opened && <div className="intro-screen">
        <div className="intro-wash wash-one" /><div className="intro-wash wash-two" />
        <Flower className="intro-flower left" /><Flower className="intro-flower right" />
        <div className="intro-card">
          <p className="eyebrow">A celebration of love</p>
          <div className="monogram">M <span>&</span> P</div>
          <div className="fine-rule"><i /></div>
          <p className="intro-names">Madhav <span>&</span> Priyanka</p>
          <p className="intro-date">30 · 12 · 2026</p>
          <button className="open-button" onClick={() => setOpened(true)}>
            Open invitation <Heart size={15} fill="currentColor" />
          </button>
          <p className="tiny-note">With love, we invite you to share our joy</p>
        </div>
      </div>}

      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#home" onClick={closeMenu}>M <span>&</span> P</a>
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "nav nav-open" : "nav"}>
            <a href="#story" onClick={closeMenu}>Our celebration</a>
            <a href="#details" onClick={closeMenu}>The details</a>
            <a href="#rsvp" onClick={closeMenu}>RSVP</a>
          </nav>
          <button className="share-top" onClick={shareInvite}><Share2 size={15} /> Share invite</button>
        </header>

        <section className="hero" id="home">
          <div className="hero-bg-shape shape-a" /><div className="hero-bg-shape shape-b" />
          <Flower className="hero-flower flower-a" /><Flower className="hero-flower flower-b" />
          <div className="hero-content">
            <p className="eyebrow"><Sparkles size={13} /> Together with our families <Sparkles size={13} /></p>
            <p className="hero-kicker">We are getting married</p>
            <h1>Madhav <em>&</em><br />Priyanka</h1>
            <div className="hero-divider"><span /><Heart size={13} fill="currentColor" /><span /></div>
            <p className="hero-date">30 December 2026 <b>·</b> Solapur</p>
            <p className="hero-copy">Two hearts, one beautiful journey.<br />Please join us as we begin our forever.</p>
            <a className="round-link" href="#story" aria-label="Scroll to invitation"><ArrowDown size={18} /></a>
          </div>
          <div className="hero-side-note">A DAY TO REMEMBER · A LOVE TO CELEBRATE</div>
        </section>

        <section className="welcome section-pad" id="story">
          <div className="section-label">॥ श्री गणेशाय नमः ॥</div>
          <p className="script-line">With the blessings of our families</p>
          <h2>A new chapter<br /><em>begins here.</em></h2>
          <p className="welcome-copy">With hearts full of happiness and gratitude, we invite you to be part of a day that marks the beginning of our forever. Your presence and blessings will make our celebration even more special.</p>
          <div className="name-signoff"><span>Madhav</span><i>&</i><span>Priyanka</span></div>
          <Flower className="welcome-flower" />
        </section>

        <section className="countdown-section">
          <div className="countdown-inner">
            <p className="eyebrow">Save the date</p>
            <h2>Counting down to <em>forever</em></h2>
            <div className="countdown">
              {Object.entries(countdown).map(([unit, value]) => <div className="count-box" key={unit}>
                <strong>{String(value).padStart(2, "0")}</strong><span>{unit}</span>
              </div>)}
            </div>
            <p className="count-note">{dateLabel}</p>
            <button className="text-button" onClick={addToCalendar}><CalendarDays size={16} /> Add to calendar</button>
          </div>
        </section>

        <section className="details section-pad" id="details">
          <div className="section-label">The celebration</div>
          <h2>Join us for our <em>special day</em></h2>
          <p className="details-intro">A day filled with love, laughter and memories we will cherish forever.</p>
          <div className="event-card">
            <div className="event-ornament"><Flower2 size={28} strokeWidth={1.2} /></div>
            <p className="event-overline">The wedding celebration</p>
            <h3>Madhav <span>&</span> Priyanka</h3>
            <div className="event-date"><CalendarDays size={17} /> Wednesday, 30 December 2026</div>
            <div className="event-line" />
            <div className="event-location"><MapPin size={18} /><div><b>Gujarati Bhavan</b><span>Old Police Line, Murarji Peth<br />Solapur, Maharashtra 413001</span></div></div>
            <div className="event-actions">
              <a className="pill-button filled" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={15} /> Get directions</a>
              <button className="pill-button outline" onClick={copyAddress}><Copy size={15} /> {copied ? "Copied!" : "Copy address"}</button>
            </div>
            <p className="time-note">Ceremony time and additional event details will be shared soon.</p>
          </div>
        </section>

        <section className="rsvp-section" id="rsvp">
          <div className="rsvp-decoration"><Flower /></div>
          <div className="rsvp-content">
            <p className="eyebrow">We saved you a place</p>
            <h2>Will you <em>join us?</em></h2>
            <p>Kindly let us know if you can celebrate with us.</p>
            {rsvpDone ? <div className="rsvp-success"><span><Check size={22} /></span><h3>Thank you!</h3><p>Your response is ready to share. If it wasn't sent automatically, please share the copied response with the hosts.</p><button className="pill-button outline" onClick={() => { setRsvpDone(false); setRsvp({name:"",attendance:"joyfully-accept",guests:"2",message:""}); }}>Edit response</button></div> :
              <form className="rsvp-form" onSubmit={submitRsvp}>
                <label>Your name<input required value={rsvp.name} onChange={e => setRsvp({...rsvp, name:e.target.value})} placeholder="Enter your name" /></label>
                <label>Your response<select value={rsvp.attendance} onChange={e => setRsvp({...rsvp, attendance:e.target.value})}><option value="joyfully-accept">Joyfully accepts</option><option value="regretfully-decline">Regretfully declines</option></select></label>
                <label>Number of guests<select value={rsvp.guests} onChange={e => setRsvp({...rsvp, guests:e.target.value})}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}</select></label>
                <label>A little message <textarea rows="3" value={rsvp.message} onChange={e => setRsvp({...rsvp, message:e.target.value})} placeholder="Write a note for the couple (optional)" /></label>
                <button className="pill-button filled submit-button" type="submit">Send RSVP <Heart size={15} fill="currentColor" /></button>
                <small>This demo prepares your response to share; it does not store submissions on a server.</small>
              </form>}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-monogram">M <span>&</span> P</div>
          <p>Made with love, for a day full of love.</p>
          <div className="footer-names">Madhav <i>&</i> Priyanka</div>
          <span className="footer-date">30 · 12 · 2026</span>
        </footer>
        <button className="floating-share" onClick={shareInvite} aria-label="Share invitation"><Share2 size={18} /></button>
      </div>
    </main>
  );
}

export default App;