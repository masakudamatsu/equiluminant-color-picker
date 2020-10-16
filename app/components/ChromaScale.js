import styled from 'styled-components';
import PropTypes from 'prop-types';

const Svg = styled.svg`
  width: 32px;
`;

function ChromaScale(props) {
  return (
    <Svg viewBox="0 0 32 255" aria-labelledby="chromaScale">
      <title id="chromaScale">Chroma scale</title>
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-1"
        >
          <stop stop-color="#0000FF" offset="0%"></stop>
          <stop stop-color="#1F1FFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-2"
        >
          <stop stop-color="#2020FF" offset="0%"></stop>
          <stop stop-color="#3F3FFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-3"
        >
          <stop stop-color="#4040FF" offset="0%"></stop>
          <stop stop-color="#5F5FFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-4"
        >
          <stop stop-color="#6060FF" offset="0%"></stop>
          <stop stop-color="#7F7FFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-5"
        >
          <stop stop-color="#8080FF" offset="0%"></stop>
          <stop stop-color="#9F9FFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-6"
        >
          <stop stop-color="#A0A0FF" offset="0%"></stop>
          <stop stop-color="#BFBFFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-7"
        >
          <stop stop-color="#C0C0FF" offset="0%"></stop>
          <stop stop-color="#DFDFFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-8"
        >
          <stop stop-color="#E0E0FF" offset="0%"></stop>
          <stop stop-color="#FFFFFF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g fill="none" stroke="none">
        <rect
          fill="url(#linearGradient-1)"
          x="0"
          y="0"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-2)"
          x="0"
          y="32"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-3)"
          x="0"
          y="64"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-4)"
          x="0"
          y="96"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-5)"
          x="0"
          y="128"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-6)"
          x="0"
          y="160"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-7)"
          x="0"
          y="192"
          width="32"
          height="31"
        />
        <rect
          fill="url(#linearGradient-8)"
          x="0"
          y="224"
          width="32"
          height="31"
        />
      </g>
    </Svg>
  );
}

ChromaScale.propTypes = {};

export default ChromaScale;
