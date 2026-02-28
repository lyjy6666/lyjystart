import React, { useState, useEffect, useRef } from "react";
import Background from "@/components/Background";
import StatisticsModal from "@/components/StatisticsModal";
import { generateRandomStatsData } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
const TITLE_TEXT = "LYJY导航系统";

export default function Home() {
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [statsData] = useState(generateRandomStatsData());
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dynamicNumber, setDynamicNumber] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const targetNumber = Math.floor(Math.random() * 1000) + 500;
        const startTime = Date.now();

        const updateNumber = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(easedProgress * targetNumber);
            setDynamicNumber(currentNumber);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        updateNumber();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const elements = document.querySelectorAll(".parallax-element");

            elements.forEach((element, index) => {
                const factor = 0.1 + index * 0.05;
                (element as HTMLElement).style.transform = `translateY(${scrollY * factor}px)`;
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fadeInUpVariant = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },

        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                type: "spring",
                stiffness: 100 + i * 20,
                damping: 10 - i * 0.5,
                delay: 0.2 + i * 0.1,
                duration: 0.5
            }
        })
    };

    const buttonVariant = {
        hidden: {
            opacity: 0,
            y: 10,
            scale: 0.95
        },

        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 + i * 0.15,
                duration: 0.4
            }
        })
    };

    const decorationVariant = {
        hidden: {
            opacity: 0
        },

        visible: (i: number) => ({
            opacity: 1,

            transition: {
                delay: 0.8 + i * 0.2,
                duration: 1
            }
        })
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {}
            <Background />
            {}
            <div
                ref={containerRef}
                className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 z-10">
                {}
                <motion.div
                    className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none"
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 0.2
                    }}
                    transition={{
                        duration: 1.5,
                        delay: 0.5
                    }}>
                    {Array.from({
                        length: 7
                    }).map((_, i) => <motion.div
                        key={`v-${i}`}
                        className="absolute w-px h-full bg-blue-500/30"
                        style={{
                            left: `${i * 100 / 6}%`
                        }}
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: "100%"
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.8 + i * 0.1
                        }}></motion.div>)}
                    {Array.from({
                        length: 7
                    }).map((_, i) => <motion.div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-blue-500/30"
                        style={{
                            top: `${i * 100 / 6}%`
                        }}
                        initial={{
                            width: 0
                        }}
                        animate={{
                            width: "100%"
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.8 + i * 0.1
                        }}></motion.div>)}
                </motion.div>
                {}
                <motion.div
                    className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-500/50 text-blue-400 flex items-center gap-2"
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <i className="fa-solid fa-terminal"></i>
                    <span className="text-sm">系统运行中: {dynamicNumber}</span>
                </motion.div>
                {}
                <motion.div
                    className="mb-12 text-center"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
                        style={{
                            backgroundImage: "linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)",
                            backgroundSize: "300% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                        }}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}>
                        {TITLE_TEXT}
                    </motion.h1>
                    {}
                    <motion.div
                        className="mt-4 h-1 w-32 md:w-48 mx-auto bg-gradient-to-r from-blue-500 to-transparent rounded-full"
                        initial={{
                            width: 0
                        }}
                        animate={{
                            width: "12rem"
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.7
                        }} />
                </motion.div>
                {}
                <motion.div
                    className="mb-8 text-center max-w-lg px-4"
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <div
                        className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 shadow-lg shadow-blue-500/10">
                        <p className="text-blue-100 text-lg font-light leading-relaxed">欢迎使用LYJY导航系统，请选择您需要访问的服务
                                        </p>
                    </div>
                </motion.div>
                {}
                <motion.div
                    className="absolute -left-20 top-1/3 hidden lg:block"
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={decorationVariant}>
                    <div
                        className="w-32 h-64 bg-gradient-to-b from-blue-500/10 to-transparent overflow-hidden">
                        {Array.from({
                            length: 20
                        }).map((_, i) => <div
                            key={i}
                            className="text-xs text-blue-400/30 font-mono animate-fade-up"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${5 + Math.random() * 3}s`,
                                transform: `translateY(${Math.random() * 500}px)`
                            }}>
                            {Math.random().toString(36).substring(2, 10)}
                        </div>)}
                    </div>
                </motion.div>
                <motion.div
                    className="absolute -right-20 top-1/4 hidden lg:block"
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={decorationVariant}>
                    <></>
                </motion.div>
                {}
                <motion.div
                    className="w-full max-w-md bg-gradient-to-br from-black/60 to-slate-900/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-blue-500/30"
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    {}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMzY1YTg1MjAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzMwN2Y5ZDEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-30"></div>
                    </div>
                    {}
                    <div className="space-y-4 relative">
                        {}
                        <div className="mb-6">
                            <motion.h2
                                className="text-xs uppercase tracking-wider text-blue-400 mb-3 font-semibold flex items-center"
                                initial={{
                                    opacity: 0,
                                    x: -10
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.9
                                }}>
                                <i className="fa-solid fa-server mr-2"></i>主要服务
                                              </motion.h2>
                            <div className="space-y-3">
                                <motion.a
                                    href="https://lyjymain.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                    custom={0}
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariant}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(59, 130, 246, 0.6)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <i className="fa-solid fa-home"></i>
                                        </div>
                                        <span className="text-white font-medium">主页</span>
                                    </div>
                                    <motion.span
                                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
                                        whileHover={{
                                            scale: 1.1
                                        }}>进入
                                                          </motion.span>
                                </motion.a>
                                <motion.a
                                    href="https://lyjysearch.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-purple-600/20 to-purple-600/10 border border-purple-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                    custom={1}
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariant}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(139, 92, 246, 0.6)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <i className="fa-solid fa-search"></i>
                                        </div>
                                        <span className="text-white font-medium">搜索页</span>
                                    </div>
                                    <motion.span
                                        className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full"
                                        whileHover={{
                                            scale: 1.1
                                        }}>进入
                                                          </motion.span>
                                </motion.a>
                                <motion.a
                                    href="https://lyjytool.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-cyan-600/20 to-cyan-600/10 border border-cyan-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                    custom={2}
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariant}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(6, 182, 212, 0.6)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                            <i className="fa-solid fa-tools"></i>
                                        </div>
                                        <span className="text-white font-medium">格式转换工具箱</span>
                                    </div>
                                    <motion.span
                                        className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full"
                                        whileHover={{
                                            scale: 1.1
                                        }}>进入
                                                          </motion.span>
                                </motion.a>
                                <motion.a
                                    href="https://zr8zsx99yt.coze.site"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-green-600/20 to-green-600/10 border border-green-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                    custom={3}
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariant}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(16, 185, 129, 0.6)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                            <i className="fa-solid fa-clipboard-list"></i>
                                        </div>
                                        <span className="text-white font-medium">作业管理系统</span>
                                    </div>
                                    <motion.span
                                        className="bg-green-600 text-white text-sm px-3 py-1 rounded-full"
                                        whileHover={{
                                            scale: 1.1
                                        }}>进入
                                                          </motion.span>
                                </motion.a>
                            </div>
                        </div>
                        {}
                        <motion.div custom={4} initial="hidden" animate="visible" variants={buttonVariant}>
                            <motion.button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 border border-indigo-500/30 backdrop-blur-sm"
                                whileHover={{
                                    scale: 1.01
                                }}
                                whileTap={{
                                    scale: 0.99
                                }}>
                                <i className="fa-solid fa-gamepad"></i>
                                <span className="font-medium">{isExpanded ? "收起更多项目" : "展开更多项目"}</span>
                                <motion.i
                                    className={`fa-solid transition-transform duration-300 ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`}
                                    animate={{
                                        rotate: isExpanded ? 180 : 0
                                    }} />
                            </motion.button>
                            {}
                            <AnimatePresence>
                                {isExpanded && <motion.div
                                    initial={{
                                        height: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0
                                    }}
                                    transition={{
                                        duration: 0.3
                                    }}
                                    className="overflow-hidden">
                                    <div className="space-y-3 mt-4">
                                        <motion.a
                                            href="https://lyjyfruitgame.netlify.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-orange-600/20 to-orange-600/10 border border-orange-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                            initial={{
                                                opacity: 0,
                                                y: 10
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            transition={{
                                                delay: 0.1
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                borderColor: "rgba(245, 158, 11, 0.6)"
                                            }}>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                                    <i className="fa-solid fa-apple-alt"></i>
                                                </div>
                                                <span className="text-white font-medium">水果游戏</span>
                                            </div>
                                            <motion.span
                                                className="bg-orange-600 text-white text-sm px-3 py-1 rounded-full"
                                                whileHover={{
                                                    scale: 1.1
                                                }}>进入
                                                                        </motion.span>
                                        </motion.a>
                                        <motion.a
                                            href="https://lyjymonopoly.netlify.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-yellow-600/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                            initial={{
                                                opacity: 0,
                                                y: 10
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            transition={{
                                                delay: 0.2
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                borderColor: "rgba(234, 179, 8, 0.6)"
                                            }}>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                                                    <i className="fa-solid fa-money-bill-wave"></i>
                                                </div>
                                                <span className="text-white font-medium">大富翁计分器</span>
                                            </div>
                                            <motion.span
                                                className="bg-yellow-600 text-white text-sm px-3 py-1 rounded-full"
                                                whileHover={{
                                                    scale: 1.1
                                                }}>进入
                                                                        </motion.span>
                                        </motion.a>
                                        <motion.a
                                            href="https://grandma-lyjy.netlify.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full py-3 px-4 bg-gradient-to-r from-pink-600/20 to-pink-600/10 border border-pink-500/30 rounded-lg overflow-hidden group backdrop-blur-sm"
                                            initial={{
                                                opacity: 0,
                                                y: 10
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            transition={{
                                                delay: 0.3
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                borderColor: "rgba(236, 72, 153, 0.6)"
                                            }}>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                                                    <i className="fa-solid fa-brain"></i>
                                                </div>
                                                <span className="text-white font-medium">老人训练题</span>
                                            </div>
                                            <motion.span
                                                className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full"
                                                whileHover={{
                                                    scale: 1.1
                                                }}>进入
                                                                        </motion.span>
                                        </motion.a>
                                    </div>
                                </motion.div>}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
                {}
                <motion.div
                    className="mt-16 mb-8 text-center"
                    custom={6}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <motion.div
                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/40 to-purple-600/40 backdrop-blur-md rounded-full shadow-lg border border-blue-500/30 relative overflow-hidden"
                        whileHover={{
                            scale: 1.05
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}>
                        {}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer"></div>
                        <span className="text-white font-medium text-lg relative z-10">
                            <i className="fa-solid fa-rocket mr-2 text-blue-300"></i>敬请期待更多功能
                                        </span>
                    </motion.div>
                </motion.div>
                {}
                <motion.footer
                    className="absolute bottom-6 text-center"
                    custom={7}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <div
                        className="text-gray-400 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
                        <p>© 2025 LYJY导航系统 <span className="mx-2">|</span> <span
                                className="text-blue-400 text-xs cursor-pointer hover:text-blue-300 transition-colors"
                                onClick={() => toast("导航系统已换新升级，整个页面更加美观科幻", {
                                    icon: <i className="fa-solid fa-rocket text-blue-400" />,
                                    className: "bg-gradient-to-r from-blue-900 to-indigo-900 text-white border border-blue-500/30"
                                })}>V3.0
                                            </span></p>
                    </div>
                </motion.footer>
                {}
                <motion.button
                    onClick={() => setShowStatsModal(true)}
                    className="fixed bottom-20 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 border border-blue-500/50"
                    custom={8}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}
                    whileHover={{
                        y: -3
                    }}
                    whileTap={{
                        scale: 0.95
                    }}
                    aria-label="查看网站统计数据">
                    <i className="fa-solid fa-chart-line text-xl"></i>
                </motion.button>
                {}
                <motion.div
                    className="fixed bottom-20 left-6 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-500/30 text-xs text-blue-400 flex items-center gap-1"
                    custom={9}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span>系统在线</span>
                </motion.div>
                {}
                <StatisticsModal
                    isOpen={showStatsModal}
                    onClose={() => setShowStatsModal(false)}
                    data={statsData} />
            </div>
        </div>
    );
}