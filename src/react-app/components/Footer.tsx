import { EnvelopeSimpleIcon, GithubLogoIcon } from "@phosphor-icons/react";

import "./Footer.css";

export function Footer() {
    return (
        <footer className="site-footer">
            <p className="site-footer__disclaimer">
                本站展示的角色、剧本与短片版权归米哈游所有。角色的排序、稀有度标注与收录范围，以及剧本、短片的展示选择，均出于作者个人喜好，不代表任何官方立场。
            </p>
            <div className="site-footer__quote">
                <img src="/icon.svg" alt="" className="site-footer__icon" />
                <p className="site-footer__quote-text">
                    You shall fade when the flowers bloom
                    <br />
                    for every ending begets a beginning
                </p>
            </div>
            <div className="site-footer__links">
                <a
                    href="https://github.com/agllinea"
                    className="site-footer__link-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <GithubLogoIcon size={17} weight="duotone" />
                </a>
                <a href="mailto:lhinxue@gmail.com" className="site-footer__link-btn" aria-label="Email">
                    <EnvelopeSimpleIcon size={17} weight="duotone" />
                </a>
            </div>
            <p className="site-footer__copy">© {new Date().getFullYear()} agllinea</p>
        </footer>
    );
}
